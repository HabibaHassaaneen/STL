import { NextResponse } from "next/server";
import connect from "./../../../../lib/db";

import { ObjectId } from 'mongodb'
import Case from "./../../../../lib/modals/CaseSchema";
import {verifyToken} from "./../../../../utils/verifyToken";
export const GET = async (req,{params}) => {
  try {
    await connect();
    const caseId = await Case.find({ _id:  new ObjectId(params.id) })
    .populate("doctor_id", "name") // Adjust as per the Doctor schema
    .populate("designer_id", "name") // Adjust as per the Designer schema
    .populate("case_definition_id", "name"); // Adjust as per the CaseDefinition schema;

    return new NextResponse(JSON.stringify(caseId), { status: 200 });
  } catch (e) {
    return new NextResponse(e.message + "error in fetching cases", {
      status: 500,
    });
  }
};
export const PUT = async (req,{params}) => {
  try {
    await connect();
    
   
    const ids =  (await params).id; 
    let entryDate =  (await params).entryDate;
    const body = await req.json(); 
    console.log(body);
    console.log(entryDate)
   
  //  {entryDate = entryDate.slice(-1)[0]; 
  //   const entryDateu=new Date(entryDate);
  //    entryDate=new Date(entryDateu.getTime()-entryDateu.getTimezoneOffset()*60000);}
 
    // const fieldName = body.propertys; 
   
    const caseId = await Case.findOneAndUpdate({_id: ids},{$set:body}, {new: true});
    console.log(caseId)
    return new NextResponse(JSON.stringify(caseId), { status: 200 });
  } catch (e) {
    return new NextResponse(e.message + "error in fetching cases", {
      status: 500,
    });
  }
};
// In pages/api/cases/[id].js
// src/app/api/cases/[id]/route.js
export async function DELETE(request, { params }) {
    try {
        await connect();

        // Extract user ID from dynamic route parameters
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: "Case ID is required" }, { status: 400 });
        }

const decoded = await verifyToken(request)



        // Find and delete the user
        let deletedCase;
        if(decoded!==false&&decoded.payload.role==='admin'){    
            deletedCase = await Case.findByIdAndDelete(id);
            return NextResponse.json({ message: "case deleted successfully", case: deletedCase }, { status: 200 });
        }
      

      

           return NextResponse.json({ message: "only admin can delete  " }, { status: 404 });

    } catch (error) {
        console.error("Error deleting case:", error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}
