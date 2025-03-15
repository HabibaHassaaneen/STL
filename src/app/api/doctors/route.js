import { NextResponse } from "next/server";
import  connect from "./../../../lib/db";
import Doctor from "./../../../lib/modals/DoctorSchema";
export const GET=async()=>{
    try{
        await connect();
        const doctors = await Doctor.find({});
      
        return  NextResponse.json({ doctors }, {status:200});
        
    }catch(e){
        return  NextResponse.json(e.message+"error in fetching doctors", {status:500});
    }
}
export const POST=async(req)=>{
    try{
        await connect();
        const body = await req.json();
        const newDoctor = await Doctor.create(body);

        // Return success response
        return NextResponse.json({ success: true, data: newDoctor });
    }catch(e){
        return new NextResponse(e.message+"error in creating Doctor", {status:500});
    }
}