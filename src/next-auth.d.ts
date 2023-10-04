import NextAuth from "next-auth";

declare module "next-auth" {
    interface User
    {
        id: string;
        last_name: string;
        first_name: string;
        role: string;
        profile_picture: string;
        email: string;
        jwt: string;
        username: string;
    }
    interface Session
    {
        user: {
            id: string | null;
            last_name: string;
            first_name: string;
            role: string;
            profile_picture: string;
            email: string;
        };


    }
}
