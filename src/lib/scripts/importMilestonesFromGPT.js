import mongoose from "mongoose";
import fs from "fs";
import Milestone from "../models/Milestone.js";
import Project from "../models/Project.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});


await mongoose.connect(process.env.MONGODB_URI);

const data = JSON.parse(fs.readFileSync("gpt-output.json", "utf8"));

for (const project of data.projects) {

  const projectDoc = await Project.findOne({
    _id: project.projectId,
    milestonesStatus: "pending"
  });

  if (!projectDoc) {
    throw new Error(
      `Project ${project.projectId} not found or already processed`
    );
  }

  for (const major of project.milestones) {
    const existingMajor = await Milestone.findOne({
      projectId: project.projectId,
      type: "major",
      title: major.title
    });

    if (existingMajor) {
      throw new Error(
        `Duplicate major milestone "${major.title}" for project ${project.projectId}`
      );
    }

    const majorDoc = await Milestone.create({
      projectId: project.projectId,
      type: "major",
      parentId: null,
      order: major.order,
      title: major.title,
      objective: major.objective,
      status: "approved",
      generatedBy: "manual"
    });

    for (const minor of major.children) {
      await Milestone.create({
        projectId: project.projectId,
        type: "minor",
        parentId: majorDoc._id,
        title: minor.title,
        objective: minor.objective,
        tasks: minor.tasks,
        deliverables: minor.deliverables,
        estimatedTimeHours: minor.estimatedTimeHours,
        status: "approved",
        generatedBy: "manual"
      });
    }
  }

console.log("Updating project:", project.projectId);

await Project.updateOne(
  { _id: project.projectId },
  { $set: { milestonesStatus: "generated" } }
);

// await projectDoc.save()

console.log("Updated project:", project.projectId);
}

console.log("Milestones imported safely");
process.exit(0);
