import { verifyToken } from "./../../../../utils/verifyToken"; // Import the token verification function
import { cookies } from "next/headers"; // For accessing cookies in Next.js API route

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Get token from cookies
        const token = cookies().get("auth-token")?.value;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify token
        const user = await verifyToken(token);
        if (!user) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // Return user data
        return res.status(200).json({ user });
    } catch (error) {
        console.error("❌ Error verifying token:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
