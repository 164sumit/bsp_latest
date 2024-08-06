import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectToDB from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
import { authConfig } from "./auth.config";
import { logger } from "./lib/logger";
declare module "next-auth" {
    interface Session {
      user: {
        userType: string;
      } & DefaultSession["user"];
    }
  }
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                await connectToDB();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                const bcrypt = require("bcrypt");
                const passwordCorrect = await bcrypt.compare(
                    credentials?.password,
                    user?.password
                );
                if (passwordCorrect) {
                    logger.info(`login request successfully`,{ metadata: { owner: user?.email } });
                    return user;
                }
                throw new Error("Invalid email or password");
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: async ({ user, token, trigger, session }) => {
            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }
            
            if (user) {
                token.userType = (user  as any).userType;
            }
            return token;
        },
        session: async ({ session, token,user }) => {
            // if (token) {
                // }
                    // session.user.userType = token.userType as string;
            return {
                ...session,
                user: {
                  ...session.user,
                  userType: token.userType,
                },
              };
            },

            // return session;
        
        },
        cookies: {
            sessionToken: {
                name: 'authjs.session-token',
                options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                },
            },
            callbackUrl: {
                name: `authjs.callback-url`,
                options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                },
            },
            csrfToken: {
                name: `authjs.csrf-token`,
                options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                },
            },
            },
    
   
});