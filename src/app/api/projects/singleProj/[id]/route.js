import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/lib/models/Project";
import mongoose from "mongoose";

export async function GET(req, context) {
  const { id } = await context.params;

  await dbConnect();



  const project = await Project.findById(id).lean();

  if (!project) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
