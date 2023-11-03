import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/auth";



export function auth(...args: [ GetServerSidePropsContext[ "req" ], GetServerSidePropsContext[ "res" ] ] | [ NextApiRequest, NextApiResponse ] | [])
{
  return getServerSession(...args, authOptions);
}

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };
