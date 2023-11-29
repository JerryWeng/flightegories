import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const flights =
      await sql`
        CREATE TABLE IF NOT EXISTS flights (
        flightNo char(6) PRIMARY KEY,
        depart_details date NOT NULL,
        flight_from varchar(50) NOT NULL,
        destination varchar(50) NOT NULL,
        airline varchar(20) NOT NULL,
        flightStatus varchar(20) NOT NULL);`;

    const users =
        await sql`
          CREATE TABLE IF NOT EXISTS users (
          userId serial PRIMARY KEY,
          fName varchar(15) NOT NULL,
          lName varchar(15) NOT NULL,
          flightNo char(6) REFERENCES flights (flightNo));`;
        
    return NextResponse.json({ flights, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}