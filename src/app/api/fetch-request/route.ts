import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const url = new URL(req.url);
        const takeoffDate = url.searchParams.get('takeoffDate');
        const arrivalDate = url.searchParams.get('arrivalDate');
        const departureAirport = url.searchParams.get('departureAirport');
        const arrivalAirport = url.searchParams.get('arrivalAirport');

        // Start building the query and parameters
        let queryString = 'SELECT * FROM flights';
        let parameters = [];
        let conditions = [];

        // Append conditions based on provided query parameters
        if (takeoffDate) {
            conditions.push(`takeoff_date = $${conditions.length + 1}`);
            parameters.push(takeoffDate);
        }
        if (arrivalDate) {
            conditions.push(`arrival_date = $${conditions.length + 1}`);
            parameters.push(arrivalDate);
        }
        if (departureAirport) {
            conditions.push(`departure_airport = $${conditions.length + 1}`);
            parameters.push(departureAirport);
        }
        if (arrivalAirport) {
            conditions.push(`arrival_airport = $${conditions.length + 1}`);
            parameters.push(arrivalAirport);
        }

        
        if (conditions.length > 0) {
            queryString += ' WHERE ' + conditions.join(' AND ');
        }

        
        const data = await sql`SELECT * FROM flights;`;

       
        return NextResponse.json(data.rows);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
