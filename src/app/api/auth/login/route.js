import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/UserSchema";

import { setCookie } from "@/utils/generateToken";


export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.email ||!body.password) {
            return NextResponse.json({ message: "Please provide both email and password" }, { status: 400 });
        }
        await connect();
//login user
        const user = await User.findOne({ email: body.email }).select("+password");
     // check if user exists
        if (!user) {
            return NextResponse.json({ message: "please make sure you have an account" }, { status: 400 });
        }
     // check if password is correct
        const isPasswordCorrect = await user.comparePassword(body.password,user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Invalid  password" }, { status: 401 });
        }
     // create token
     
       
        //save token in cooki\
        // const cooki=serialize("auth-token",token,{
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "Strict",
        //     path: "/",
        //     maxAge: 60 * 60 * 24 * 7,
        // })
     // select only necessary fields before sending response
        // const userResponse = await User.findById(user._id).select("username email _id role");
        const response = NextResponse.json(
            { message: " successful" },
            { status: 200 }
        );

        // Set cookie in response
        return  setCookie({ id: user._id,role:user.role,name:user.username },response);
       
 } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while login" }, { status: 500 });
        
    }
}
