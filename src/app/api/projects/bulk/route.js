import Project from "@/lib/models/Project";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    await Project.insertMany(data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
