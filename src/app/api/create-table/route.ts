import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const flights =
      await sql`
        CREATE TABLE IF NOT EXISTS flights (
          flightNo char(6) PRIMARY KEY,
          departure_time timestamp NOT NULL,
          arrival_time timestamp NOT NULL,
          departure_airport varchar(50) REFERENCES airports (airportName),
          arrival_airport varchar(50) REFERENCES airports (airportName),
          airline varchar(20) NOT NULL);`;

    const users =
        await sql`
          CREATE TABLE IF NOT EXISTS users (
            userId serial PRIMARY KEY,
            fName varchar(15) NOT NULL,
            lName varchar(15) NOT NULL);`;
    
    const airports =
        await sql`
          CREATE TABLE IF NOT EXISTS airports (
            airportCode char(3) PRIMARY KEY,
            airportName varchar(50) NOT NULL,
            city varchar(20) NOT NULL,
            country varchar(20) NOT NULL
          );`;
    
    const reservations = 
        await sql`
          CREATE TABLE IF NOT EXISTS reservations (
            reservationId serial PRIMARY KEY,
            userId serial REFERENCES users (userId),
            flightNo char(6) REFERENCES flights (flightNo)
          );`;

    const fares = 
        await sql`
          CREATE TABLE IF NOT EXISTS fares (
            flightNo char(6) REFERENCES flights (flightNo),
            fareCode varchar(5) PRIMARY KEY,
            fareAmount decimal NOT NULL default 0.00
          );`;
    
    return NextResponse.json({ users, airports, flights, reservations, fares }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}