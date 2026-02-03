import mongoose from "mongoose";
import Milestone from "../models/Milestone";

await mongoose.connect(process.env.MONGODB_URI);

await Milestone.updateMany(
  { status: "draft" },
  { $set: { status: "approved" } }
);

console.log("All draft milestones approved");
process.exit(0);
