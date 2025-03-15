import NextAuth from "next-auth"
import User from "@lib/modals/UserSchema"
import bcrypt from "bcryptjs";
import connect "@lib/db.js"
export default async function auth(req,res){
    return await NextAuth(req,res,{
        session:{
            strategy:'jwt'
        }
    })
}