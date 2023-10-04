import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";;
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {},
            authorize: async (credentials, req) =>
            {
                const { email, password } = credentials as {
                    email: string,
                    password: string;
                };

                try {
                    const res = await fetch(
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

                    if (data?.error?.status === 400) {
                        throw new Error(data?.error.message);
                    } else {
                        return { ...data?.user, jwt: data.jwt };
                    }

                } catch (error) {

                    throw new Error(String(error));
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
            session.user.id = user ? user.id : null;
            return Promise.resolve(session);

        },
        jwt: async ({ token, user, account }) =>
        {
            const isSignIn = user ? true : false;
            console.log("This is the user", user);

            if (account?.provider !== "credentials") {
                console.log("This is the account", account);
                if (isSignIn) {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`);
                    token.jwt = data.jwt;
                    token.id = data.id;
                    token.picture = user.profile_picture;
                }
            } else {
                token.jwt = user.jwt;
                token.id = user.id;
                token.name = user.username;

            }
            return Promise.resolve(token);
        }


    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/sign-in"
    },

};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
