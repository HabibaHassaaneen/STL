import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import User from "@/lib/modals/UserSchema";
import connect from "@/lib/db";

export async function GET() {
  try {
    await connect();
    const token = (await cookies()).get("auth-token")?.value || null;
    
    if (!token) {
      // Return a structured response for no token
      return NextResponse.json({ 
        authenticated: false,
        message: 'Please sign in to continue', 
        redirectUrl: '/signin'
      });
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
    }
    
    // Convert Mongoose document to plain object
    const userObj = user.toObject();
    
    // Remove sensitive data before returning
    const { password, ...userWithoutPassword } = userObj;
    
    // Return the user data with authentication status
    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword
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