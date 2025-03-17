import { NextResponse } from "next/server";
import connect from "./../../../../lib/db";
import { ObjectId } from 'mongodb'
import Case from "./../../../../lib/modals/CaseSchema";

export const PUT = async (req) => {
  try {
    await connect();
    const { id } = req.body;
    const caseId = await Case.findOneAndUpdate(
      { _id: new ObjectId(id) },
      [{ $set: { designed: { $eq: [false, "$designed"] } } }]
    );

    return NextResponse.json(caseId, { status: 200 });
  } catch (e) {
    return NextResponse.json(e.message + "error in fetching cases", {
      status: 500,
    });
  }
};