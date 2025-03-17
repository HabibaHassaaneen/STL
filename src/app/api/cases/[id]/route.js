import { NextResponse } from "next/server";
import connect from "./../../../../lib/db";
import { ObjectId } from 'mongodb'
import Case from "./../../../../lib/modals/CaseSchema";
import { verifyToken } from "./../../../../utils/verifyToken";

export const GET = async (req, { params }) => {
  try {
    await connect();
    const caseId = await Case.find({ _id: new ObjectId(params.id) })
      .populate("doctor_id", "name")
      .populate("designer_id", "name")
      .populate("case_definition_id", "name");

    return NextResponse.json(
      caseId,
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (e) {
    return NextResponse.json(e.message + "error in fetching cases", {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connect();

    const ids = (await params).id;
    let entryDate = (await params).entryDate;
    const body = await req.json();
    console.log(body);
    console.log(entryDate);

    const caseId = await Case.findOneAndUpdate({ _id: ids }, { $set: body }, { new: true });
    console.log(caseId);
    return NextResponse.json(caseId, { status: 200 });
  } catch (e) {
    return NextResponse.json(e.message + "error in fetching cases", {
      status: 500,
    });
  }
};

export async function DELETE(request, { params }) {
  try {
    await connect();

    // Extract user ID from dynamic route parameters
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Case ID is required" }, { status: 400 });
    }

    const decoded = await verifyToken(request);

    // Find and delete the user
    let deletedCase;
    if (decoded !== false && decoded.payload.role === 'admin') {
      deletedCase = await Case.findByIdAndDelete(id);
      return NextResponse.json({ message: "case deleted successfully", case: deletedCase }, { status: 200 });
    }

    return NextResponse.json({ message: "only admin can delete" }, { status: 404 });
  } catch (error) {
    console.error("Error deleting case:", error);
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}