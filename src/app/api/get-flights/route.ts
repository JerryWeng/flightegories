import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
      //TODO: switch case for different filters on search
    const { rows } = await sql`SELECT * FROM flights;`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error }, { status: 500 });
  }
}