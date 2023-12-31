import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      const airportData =
        await sql`SELECT airportname FROM airports`;

      const departureTimeData = 
        await sql `SELECT departure_time FROM flights`;

      const arrivalTimeData = 
        await sql`SELECT arrival_time FROM flights`;
        
      return NextResponse.json({ airportData, departureTimeData, arrivalTimeData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
  }