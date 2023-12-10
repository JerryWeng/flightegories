import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres"

export const OPTIONS: any = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                const response = await sql`
                    SELECT * FROM users WHERE username=${credentials?.username}`;
                const user = response.rows[0];
                const isPasswordCorrect = await bcrypt.compare(
                    credentials?.password || '',
                    user.password
                )
                if (isPasswordCorrect) {
                    return {
                        id: user.id,
                        username: user.username,
                    }
                }
            },
        }),
    ],
};

export const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };