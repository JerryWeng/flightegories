import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { username, password, firstName, lastName } = await request.json();

    const existingUser = await sql`
        SELECT username from users WHERE username=${username}`;

    if (existingUser.rows[0] != null) {
        return new NextResponse("Username is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        const response = await sql`
            INSERT INTO users VALUES (DEFAULT, ${username}, ${hashedPassword}, ${firstName}, ${lastName});`;
        return new NextResponse("User is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
}