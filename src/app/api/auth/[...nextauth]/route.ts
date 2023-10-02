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
            name: "Credentials",
            id: "credentials",
            credentials: {},
            authorize: async (credentials, req) =>
            {
                const { email, password } = credentials as {
                    email: string,
                    password: string;
                };

                console.log(credentials);
                try {

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


                    const user = { ...data.user, jwt: data.jwt };


                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
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
            session.user.id = user ? user.id : null;

            // console.log("This is from session", user);
            return Promise.resolve(session);

        },
        jwt: async ({ token, user, account }) =>
        {
            const isSignIn = user ? true : false;


            if (account?.provider !== "credentials") {
                if (isSignIn) {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`);
                    token.jwt = data.jwt;
                    token.id = data.id;
                }
            }
            return Promise.resolve(token);
        }


    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/sign-in"
    },

});


export { handler as GET, handler as POST };
