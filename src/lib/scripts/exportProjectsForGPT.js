import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});



await mongoose.connect(process.env.MONGODB_URI);

const projects = await Project.find({ milestonesStatus: "pending" })
  .sort({ createdAt: 1 })
  .limit(5);

const payload = projects.map(p => ({
  projectId: p._id.toString(),
  name: p.name,
  description: p.description,
  domain: p.domain,
  techStack: p.techStack,
  difficulty: p.difficulty,
  effort: p.effort.level,
  outcomes: p.outcomes
}));

fs.writeFileSync("exported-projects.json", JSON.stringify(payload, null, 2), "utf8");
console.log(payload.length );
process.exit(0);
