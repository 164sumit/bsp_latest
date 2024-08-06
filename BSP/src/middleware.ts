import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { adminOnlyRoutes, normalUserRoutes, powerUserRestrictedRoutes, publicRoutes } from './lib/routes';

// import { loadSensors } from './actions/sensor.action';


export async function middleware(request: NextRequest) {
    // return NextResponse.next();

    const pathname = request.nextUrl.pathname;
    // loadSensors().catch(err => console.error('Failed to load sensors on startup:', err));
    // return NextResponse.next();
    // console.log("salt: ",process.env.AUTH_SALT);
//     const rawToken = await getToken({ reqL:request, raw: true })
//   console.log(rawToken)
    
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET!,
        // Ensure this matches the name of the secure cookie used in production
        
        salt: process.env.AUTH_SALT || 'authjs.session-token',
        
        });
        
    if (publicRoutes.includes(pathname)) {
        if(token && pathname === '/login'){
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const userType = token?.userType;
    
    if (userType === 'admin') {
        if(adminOnlyRoutes.includes(pathname)){
            return NextResponse.next();
        }
        else{
    
            return NextResponse.redirect(new URL('/admin/register', request.url));
        }
        
    } else if (userType === 'normal') {
        if (!normalUserRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (userType === 'poweruser') {
        if (powerUserRestrictedRoutes.some(route => pathname.match(route))) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    if (pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};