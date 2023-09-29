import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            name: "credentials",
            id: "credentials",
            credentials: {},
            authorize: async (credentials, req) =>
            {

                console.log("This is the credentials", credentials);
                const { email, password } = credentials as {
                    email: string,
                    password: string;
                };

                let res = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/local`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            identifier: email,
                            password: password,
                        }),
                    }
                );

                const data = await res.json();
                console.log(res);

                const user = { ...data.user, jwt: data.jwt };
                if (user) {
                    return user;
                } else {
                    return null;
                }

            }
        })

    ],
    session: {
        strategy: "jwt",

    },
    callbacks: {
        session: async ({ user, session, token }) =>
        {
            session.user = token as any;
            // session.user.id = user ? user.id : null;
            return Promise.resolve(session);

        },
        jwt: async ({ token, user, account }) =>
        {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`);
                token.jwt = data.jwt;
                token.id = data.id;
            }
            return Promise.resolve(token);
        }


    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/sign-in"
    }
});


export { handler as GET, handler as POST };
