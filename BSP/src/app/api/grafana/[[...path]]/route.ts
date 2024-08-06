import { NextRequest, NextResponse } from 'next/server';
import { createProxy } from 'http-proxy';

const proxy = createProxy();

export async function GET(request: NextRequest) {
  return await proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return await proxyRequest(request);
}

// Add other HTTP methods as needed (PUT, DELETE, etc.)

async function proxyRequest(request: NextRequest) {
  return new Promise<NextResponse>((resolve, reject) => {
    const url = new URL(request.url);
    const targetUrl = `http://grafana:3000${url.pathname.replace('/api/grafana', '')}${url.search}`;

    proxy.web(
      request as any,
      {
        end: (res: any) => {
          resolve(new NextResponse(res));
        },
      } as any,
      {
        target: targetUrl,
        changeOrigin: true,
        selfHandleResponse: true,
      },
      (err: any) => {
        reject(err);
      }
    );
  });
}

 const config = {
  api: {
    bodyParser: false,
  },
};