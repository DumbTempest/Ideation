import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: [String],
      required: true,
      index: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    label: {
      type: String,
      index: true,
    },

    projectType: {
      type: String,
      enum: ["mini", "balanced", "open-source", "research"],
      index: true,
    },

    difficulty: {
      level: {
        type: String,
        enum: ["newbie", "moderate", "cracked", "10x"],
        required: true,
        index: true,
      },
      prerequisites: {
        type: [String],
        default: [],
      },
    },

    effort: {
      level: {
        type: String,
        enum: ["low", "medium", "high", "crazy"],
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },

    outcomes: {
      type: [String],
      default: [],
    },

    links: {
      type: [String],
      default: [],
    },

    milestonesStatus: {
      type: String,
      enum: ["pending", "generated"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema, "projects");
