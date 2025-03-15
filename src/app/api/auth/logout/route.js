import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
   try {
    (await cookies()).delete("auth-token");

    return new NextResponse("log out ", { status: 200 });
   } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting cookie", { status: 500 });
    
   }}
   