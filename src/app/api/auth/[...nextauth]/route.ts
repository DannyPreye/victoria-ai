import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {},
      authorize: async (credentials, req) =>
      {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/local?`,
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

          console.log(data);

          if (data?.error?.status === 400) {
            throw new Error(data?.error.message);
          } else {
            const user_data = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${data?.user.id}?populate=*`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${data.jwt}`,
                },
              }
            );
            const parsed_user_data = await user_data.json();

            return {
              ...parsed_user_data,
              profile_picture: parsed_user_data?.profile_picture?.url,
              jwt: data.jwt,
            };
          }
        } catch (error) {
          throw new Error(String(error));
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ user, session, token }) =>
    {
      session.user = token as any;
      session.user.id = token.sub as string;
      session.jwt = token.jwt as string;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user, account, trigger, session }) =>
    {
      const isSignIn = user ? true : false;
      if (trigger == "update") {
        console.log("From trigger", token, session);
        return { ...token, ...session.user };
      }

      if (account?.provider !== "credentials") {
        if (isSignIn) {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          );
          token.jwt = data.jwt;
          token.id = data.id;
          token.profile_picture = user.profile_picture;
        }
      } else {
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.username;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.profile_picture = user.profile_picture;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
