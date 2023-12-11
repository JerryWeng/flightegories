import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const flightNo = ""

        
        const data = await sql`SELECT * FROM flights WHERE flightNo = ;`;

       
        return NextResponse.json(data.rows);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
