import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: Request)
{
    const body = await req.text();

}
