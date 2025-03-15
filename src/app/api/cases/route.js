import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Case from "@/lib/modals/CaseSchema";



export const GET = async (req) => {
  try {
    await connect();
   
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    let filter = {};

    // Apply filters dynamically
    if (searchParams.has("designed")) {
      filter.designed = searchParams.get("designed") === "true";
    }
    if (searchParams.has("production")) {
      filter.production = searchParams.get("production") === "true";
    }
    if (searchParams.has("Delivered")) {
      filter.delivered = searchParams.get("Delivered") === "true";
    }
    if (searchParams.has("Confirmed")) {
      filter.confirmed = searchParams.get("Confirmed") === "true";
    }
    if (searchParams.has("case-definition")) {
      filter.case_definition_id = { $in: searchParams.getAll("case-definition") };
    }
    if (searchParams.has("designers")) {
      filter.designer_id = { $in: searchParams.getAll("designers") };
    }
    if (searchParams.has("doctors")) {
      filter.doctor_id = { $in: searchParams.getAll("doctors") };
    }
    if (searchParams.has("status")) {
      filter.status = { $in: searchParams.getAll("status") };
    }

    // Get total cases count before pagination
    const totalCases = await Case.countDocuments(filter);

    // Fetch cases with pagination (only when `all` is false)
    let casesQuery = Case.find(filter)
      .populate("doctor_id", "name")
      .populate("designer_id", "name")
      .populate("case_definition_id", "name");

    if (!all) {
      casesQuery = casesQuery.skip(skip).limit(limit);
    }

    const cases = await casesQuery.exec(); // ✅ Ensure query execution

    return NextResponse.json({ totalCases, cases }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};



export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json();

    // ✅ Convert entryDate & dueDate to UTC format
    const entryDateObj = new Date(body.entryDate);
    let entryDate = [new Date(entryDateObj.getTime() - entryDateObj.getTimezoneOffset() * 60000)];

    const dueDateObj = new Date(body.dueDate);
    let dueDate = new Date(dueDateObj.getTime() - dueDateObj.getTimezoneOffset() * 60000);

    // ✅ Create new case
    const newCase = await Case.create({ ...body, dueDate, entryDate });

    // ✅ Populate related fields
    const populatedCase = await Case.findById(newCase._id)
      .populate("doctor_id", "_id name picture")
      .populate("designer_id", "_id name")
      .populate("case_definition_id", "_id name");

    return NextResponse.json({ success: true, data: populatedCase });
  } catch (e) {
    console.error("Error creating case:", e);
    return new NextResponse(`Error creating case: ${e.message}`, { status: 500 });
  }
};

// ✅ Helper function: Get doctor IDs by name
async function getDoctorIds(doctorName) {
  const doctors = await Doctor.find({
    name: { $regex: new RegExp(doctorName, "i") }, // Case-insensitive search
  }).select("_id");

  return doctors.map((doc) => doc._id);
}
