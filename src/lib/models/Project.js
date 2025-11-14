import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    domain: { type: [String], required: true },
    techStack: { type: [String], required: true },
    label: { type: String, required: false },
    difficulty: { type: String, required: true },
    
    links: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
