
import * as jose from 'jose'
import * as jwt from 'jsonwebtoken'

export async function verifyToken(request){
    const JWT_SECRET = process.env.JWT_SECRET;
   const secret = new TextEncoder().encode(JWT_SECRET );
   const token =request.cookies.get("auth-token");

//     console.log("✅ Token valid for user ID:", decoded.payload.id);

  
    
    if(!token?.value) return false;
  
    try {
        const decoded = await jose.jwtVerify(token?.value, secret );
      console.log('decoded',decoded)
        return decoded;
    } catch (error) {
        console.error("�� Token invalid:", error);
        return false;
    }
}


export async function verifyTokenForPage(token) { 
    if (!token) return null; // Ensure token is provided
    const JWT_SECRET =process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined"); // ✅ Ensure secret exists

    const secret = new TextEncoder().encode(JWT_SECRET); 
  
    try {
  
        const decoded =jose.jwtVerify(token.value,secret);

        return decoded; // ✅ Return the payload data
    } catch (error) {
        console.error("❌ Token invalid:", error);
        return null; // Return null if verification fails
    }
}
