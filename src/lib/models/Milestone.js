import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  type: {
    type: String,
    enum: ["major", "minor"],
    required: true
  },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    index: true
  },

  order: Number,

  title: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },

  tasks: [String],
  deliverables: [String],
  estimatedTimeHours: Number,

  status: {
    type: String,
    enum: ["draft", "approved"],
    default: "draft"
  },

  generatedBy: {
    type: String,
    enum: ["ai", "manual"],
    default: "ai"
  }
}, { timestamps: true });

export default mongoose.models.Milestone ||
  mongoose.model("Milestone", MilestoneSchema);
