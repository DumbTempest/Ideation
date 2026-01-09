import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true,
    },

    domain: {
      type: [String],
      required: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    projectType: {
      type: String,
      required: false,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["newbie", "moderate", "cracked", "10x"],
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    effort: {
      level: {
        type: String,
        required: true,
        enum: ["low", "medium", "slightly intensive", "crazy"],
      },
      description: {
        type: String,
      },
    },

    outcomes: {
      type: [String],
      default: [],
    },

    label: {
      type: String,
    },

    links: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: true, 
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
