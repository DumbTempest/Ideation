import mongoose from "mongoose";
import Project from "../models/Project.js";
import Milestone from "../models/Milestone.js";

import { callAI } from "../AI/callAI.js";
import { validateMajorMilestones } from "./validator/milestones.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({
  path: path.resolve(__dirname, "../../.env.local")
});

console.log("Generating major milestones...");

async function main() {

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");

  const LIMIT = 5;

  const projects = await Project.find({}).limit(LIMIT);

  for (const project of projects) {
    const prompt = `
You are a project planning assistant.

Project:
- Title: ${project.name}
- Description: ${project.description}
- Domain: ${project.domain.join(", ")}
- Tech stack: ${project.techStack.join(", ")}
- Difficulty: ${project.difficulty}
- Effort level: ${project.effort.level}
- Project type: ${project.projectType || "general"}

Learning outcomes:
${project.outcomes.map(o => `- ${o}`).join("\n")}

Rules:
- Generate 3–5 major milestones
- High-level phases only
- No tasks or deliverables
- Output ONLY valid JSON

Format:
{
  "milestones": [
    { "order": 1, "title": "", "objective": "" }
  ]
}
`;

    const result = await callAI(prompt);
    validateMajorMilestones(result);

    for (const m of result.milestones) {
      await Milestone.create({
        projectId: project._id,
        type: "major",
        parentId: null,
        order: m.order,
        title: m.title,
        objective: m.objective
      });
    }

    console.log(`Major milestones created for: ${project.name}`);
  }

  await mongoose.disconnect();
  console.log("Done");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
