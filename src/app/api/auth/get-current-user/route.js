import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import User from "@/lib/modals/UserSchema";
import connect from "@/lib/db";
import {addToast, Button} from "@heroui/react";
export async function GET() {
  try {
    await connect();
    const token = (await cookies()).get("auth-token")?.value || null;
    
    if (!token) {
      // Return a structured response for no token
      return NextResponse.json({ 
        authenticated: false,
        message: 'Please sign in to continue', 
        redirectUrl: '/'
      }, { status: 401 });
    }
    
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID - use findById instead of find to get a single document
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json({ 
        authenticated: false,
        message: 'User not found', 
        redirectUrl: '/signin'
      }, { status: 404 });
      addToast({
        title: "the error",
      });
    }
  
    // Return the user data with authentication status
    return NextResponse.json({
      authenticated: true,
      user
    });
  
  } catch (error) {
    console.error('Authentication error:', error.message);
    return NextResponse.json({ 
      authenticated: false,
      message: 'Authentication failed', 
      redirectUrl: '/signin',
      
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 401 });
  }
}

export async function GET() {
  const token = (await cookies()).get("auth-token")?.value || null;
  console.log(token);
  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }
  
  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded)
    // Fetch user data from the database
    const user = await getUserById(decoded.id); // Replace with your logic

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user });
  
  } catch (error) {
    // Error: Using res instead of NextResponse
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}