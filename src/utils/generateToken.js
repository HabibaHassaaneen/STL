
import jwt from 'jsonwebtoken';

export function generateJWT(jwtPeyload){
   const token = jwt.sign(jwtPeyload
    , process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_IN,
        });
        return token;
        }
        
export function setCookie(jwtPeyload,response){
    const token = generateJWT(jwtPeyload);

    // Set cookie in response

    response.cookies.set( "auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
}
// verify




