import Milestone from "../models/Milestone.js";
import Project from "../models/Project.js";
import { callAI } from "../ai/callAI.js";
import { validateMinorMilestones } from "./validator/milestones.js";

export async function generateMinorMilestones(limit = 20) {
  const majors = await Milestone.find({ type: "major" }).limit(limit);

  for (const major of majors) {
    const project = await Project.findById(major.projectId);

    const prompt = `
Generate 2–4 minor milestones.

Major milestone:
- Title: ${major.title}
- Objective: ${major.objective}

Project context:
- Difficulty: ${project.difficulty}
- Effort level: ${project.effort.level}
- Tech stack: ${project.techStack.join(", ")}

Rules:
- Each minor milestone must include:
  title, objective, tasks[], deliverables[], estimatedTimeDays
- Match the difficulty level
- Output ONLY valid JSON

Format:
{
  "milestones": [
    {
      "title": "",
      "objective": "",
      "tasks": [],
      "deliverables": [],
      "estimatedTimeDays": number
    }
  ]
}
`;

    const result = await callAI(prompt);

    validateMinorMilestones(result);

    let order = 1;
    for (const m of result.milestones) {
      await Milestone.create({
        projectId: project._id,
        type: "minor",
        parentId: major._id,
        order: order++,
        title: m.title,
        objective: m.objective,
        tasks: m.tasks,
        deliverables: m.deliverables,
        estimatedTimeDays: m.estimatedTimeDays
      });
    }

    console.log(`Minor milestones created for phase: ${major.title}`);
  }
}
