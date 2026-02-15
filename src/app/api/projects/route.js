import { dbConnect } from "@/lib/dbConnect";
import Project from "@/lib/models/Project";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const project = await Project.create(body);

    return Response.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return Response.json(projects);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
