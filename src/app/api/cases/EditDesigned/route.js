import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { ObjectId } from 'mongodb'
import Case from "@/lib/modals/CaseSchema";

export const PUT = async (req) => {
    try {
      await connect();
    const {id} = req.body
      const caseId = await Case .findOneAndUpdate({_id: new ObjectId(id)},[{$set:{designed:{$eq:[false,"$designed"]}}}]);
 
      return new NextResponse(JSON.stringify(caseId), { status: 200 });
    } catch (e) {
      return new NextResponse(e.message + "error in fetching cases", {
        status: 500,
      });
    }
  };