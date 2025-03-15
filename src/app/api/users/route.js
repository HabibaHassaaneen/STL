import { NextResponse } from "next/server";
import connect from "./../../../lib/db";
import User from "./../../../lib/modals/UserSchema";

export async function GET() {
    try {
        await connect();

        // Fetch all users, excluding passwords for security
        const users = await User.find();

        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
