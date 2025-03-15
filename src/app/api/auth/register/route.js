import { NextResponse } from "next/server";
import connect from "./../../../../lib/db";
import User from "./../../../../lib/modals/UserSchema";


import { setCookie } from "@/utils/generateToken";
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the POST request to register a new user.
 * 
 * Steps:
 * 1. Parses the request body to extract user details.
 * 2. Connects to the database.
 * 3. Checks if a user with the given email already exists.
 *    - If yes, responds with a 400 status and error message.
 * 4. Creates a new user with the provided username, email, password, and confirmPassword.
 * 5. Retrieves the newly created user's details.
 * 6. Sets an authentication cookie and responds with the user's information.
 * 
 * Error Handling:
 * - Logs any errors encountered during the process.
 * - Responds with a 500 status and error message on failure.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @returns {NextResponse} - The HTTP response with user registration details or an error message.
 */

/******  d9b8435b-0372-4efe-8e1a-c4b7fda1fc4b  *******/
export async function POST(request) {
    try {
        const body = await request.json();
        await connect();

        // Check if user already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json({ message: "This user already exists" }, { status: 400 });
        }

        // Create new user
     
        const newUser = await User.create({ username:body.username, email:body.email, password:body.password,confirmPassword:body.confirmPassword});
//         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_EXPIRE_IN,
// });
        // Select only necessary fields before sending response
        const userResponse = await User.findById(newUser._id).select("username email _id role");
        const response = NextResponse.json(
            { message: " successful" },
            { status: 200 }
        );
         return  setCookie({ id: userResponse._id },response);


    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
