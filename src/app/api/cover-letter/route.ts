import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    const body = await req.json();
    const { company_url, job_listing_url, document_url } = body;

    return new NextResponse(
        JSON.stringify({
            message: "Data recieved",

        })
    );
}
