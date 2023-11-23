// @ts-nocheck

import NextAuth, { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/utils/auth";


export function auth(...args: [ GetServerSidePropsContext[ "req" ], GetServerSidePropsContext[ "res" ] ] | [ NextApiRequest, NextApiResponse ] | [])
{
    return getServerSession(...args, authOptions);
}

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };
