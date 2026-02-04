import { dbConnect } from "@/lib/dbConnect";
import Milestone from "@/lib/models/Milestone";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await dbConnect();

    const params = await context.params;
    const { projectid } = params; 

    if (!projectid) {
      return NextResponse.json(
        { error: "projectid is required" },
        { status: 400 }
      );
    }

    const milestones = await Milestone.find({
      projectId: projectid,
      status: "approved"
    }).sort({ order: 1, createdAt: 1 });

    return NextResponse.json(milestones, { status: 200 });
  } catch (error) {
    console.error("Milestone fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch milestones" },
      { status: 500 }
    );
  }
}
