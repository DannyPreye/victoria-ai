import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

export default function middleware(req: NextRequest)
{
    const jwt = req.cookies.get("jwt-token")?.value;

    if (req.nextUrl.pathname.startsWith("/dashboard")) {

        if (!jwt) {
            return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        }

    }

    return NextResponse.next();
}


