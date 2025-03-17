import { NextResponse } from "next/server";
import connect from "./../../../lib/db";
import Designer from "./../../../lib/modals/DesignerSchema";

export const GET = async () => {
    try {
        await connect();
        const designers = await Designer.find({});
        return NextResponse.json(
            { designers },
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
        return NextResponse.json(e.message + "error in fetching designers", { status: 500 });
    }
}

export const POST = async (req) => {
    try {
        await connect();
        const body = await req.json();
        const newDesigner = await Designer.create(body);

        // Return success response
        return NextResponse.json({ success: true, data: newDesigner });
    } catch (e) {
        return NextResponse.json(e.message + "error in creating newDesigner", { status: 500 });
    }
}