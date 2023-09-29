import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req: NextRequest)
    {
        // const jwt = req.cookies.get("jwt-token")?.value;
        // const requestHeaders = new Headers(req.headers);

        // if (req.nextUrl.pathname.startsWith("/dashboard")) {

        //     if (!jwt) {
        //         return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        //     }

        // }
        // if (!req.nextUrl.pathname.startsWith("/auth")) {
        //     if (jwt) {
        //         requestHeaders.set("Authorization", `Bearer ${jwt}`);
        //     }
        // }

        // return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) =>
            {
                if (
                    req.nextUrl.pathname.startsWith('/dashboard') &&
                    token === null
                ) {
                    return false;
                }
                return true;
            }
        }
    }
);




//
