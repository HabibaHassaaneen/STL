import { NextResponse } from "next/server";
import  connect from "./../../../lib/db";
import Designer from "./../../../lib/modals/DesignerSchema";
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Fetches all designers from the database.
 *
 * Connects to the database and retrieves all designer records.
 * Returns a JSON response with the list of designers on success.
 * If an error occurs during the process, returns a JSON response with the error message.
 *
 * @returns {NextResponse} JSON response containing the designers or an error message.
 */

/******  d7c105a1-ec0d-41d4-999d-3cb71d4b53f3  *******/
export const GET=async()=>{
    try{
        await connect();
        const designers = await Designer.find({});
        return  NextResponse.json({designers}, {status:200});
     
    }catch(e){
        return  NextResponse(e.message+"error in fetching designers", {status:500});
    }
}
export const POST=async(req)=>{
    try{
        await connect();
        const body = await req.json();
        const newDesigner  = await Designer.create(body);

        // Return success response
        return NextResponse.json({ success: true, data: newDesigner });
     
    }catch(e){
        return new NextResponse(e.message+"error in creating newDesigner", {status:500});
    }
}