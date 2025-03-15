import { NextResponse } from "next/server";
import connect from "./../../../../../lib/db";
import User from "./../../../../../lib/modals/UserSchema";
import jwt from 'jsonwebtoken';
import * as jose from 'jose'
import {verifyToken} from "@/utils/verifyToken";
/*  
@method  DELETE
*/
export async function DELETE(request, { params }) {
    try {
        await connect();

        // Extract user ID from dynamic route parameters
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

const decoded = await verifyToken(request)


        // Find and delete the user
        let deletedUser;
        if(decoded!==false&&decoded.payload.id===id){    
            deletedUser = await User.findByIdAndDelete(id).select("username email _id role");
            return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
        }
      

      

           return NextResponse.json({ message: "User can delete hemself only " }, { status: 404 });

    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}
