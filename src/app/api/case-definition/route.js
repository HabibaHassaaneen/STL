import { NextResponse } from "next/server";
import  connect from "./../../../lib/db";
import CaseDefinition from "./../../../lib/modals/CaseDefinitionSchema";
export const GET=async()=>{
    try{
        await connect();
        const caseDefinitions = await CaseDefinition.find({});
        return  NextResponse.json({"case-definition":caseDefinitions}, {status:200});
        
    }catch(e){
        return  NextResponse.json(e.message+"error in fetching caseDefinitions", {status:500});
    }
}
export const POST=async(req)=>{
    try{
        await connect();
        const body = await req.json();
        const newCaseDefinition = await CaseDefinition.create(body);

        // Return success response
        return NextResponse.json({ success: true, data: newCaseDefinition });
    }catch(e){
        return new NextResponse(e.message+"error in creating newCaseDefinition", {status:500});
    }
}