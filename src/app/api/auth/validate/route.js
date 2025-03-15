// pages/api/auth/validate.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // For accessing cookies in Next.js API route

export default async function handler(req, res) {
  
const token = cookies().get("auth-token")?.value;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Return success response
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    console.error("Token validation failed:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}