
export function validateMajorMilestones(data) {
  if (!data || !Array.isArray(data.milestones)) {
    throw new Error("Major milestones: milestones must be an array");
  }

  if (data.milestones.length < 3 || data.milestones.length > 5) {
    throw new Error("Major milestones: must be between 3 and 5");
  }

  data.milestones.forEach((m, i) => {
    if (typeof m.order !== "number") {
      throw new Error(`Major milestone ${i}: order missing or invalid`);
    }

    if (!m.title || typeof m.title !== "string") {
      throw new Error(`Major milestone ${i}: title missing`);
    }

    if (!m.objective || typeof m.objective !== "string") {
      throw new Error(`Major milestone ${i}: objective missing`);
    }
  });
}


export function validateMinorMilestones(data) {
  if (!data || !Array.isArray(data.milestones)) {
    throw new Error("Minor milestones: milestones must be an array");
  }

  if (data.milestones.length < 2 || data.milestones.length > 4) {
    throw new Error("Minor milestones: must be between 2 and 4");
  }

  data.milestones.forEach((m, i) => {
    if (!m.title || typeof m.title !== "string") {
      throw new Error(`Minor milestone ${i}: title missing`);
    }

    if (!m.objective || typeof m.objective !== "string") {
      throw new Error(`Minor milestone ${i}: objective missing`);
    }

    if (!Array.isArray(m.tasks) || m.tasks.length === 0) {
      throw new Error(`Minor milestone ${i}: tasks missing`);
    }

    if (!Array.isArray(m.deliverables) || m.deliverables.length === 0) {
      throw new Error(`Minor milestone ${i}: deliverables missing`);
    }

    if (
      typeof m.estimatedTimeHours !== "number" ||
      m.estimatedTimeHours <= 0 ||
      m.estimatedTimeHours > 40
    ) {
      throw new Error(`Minor milestone ${i}: invalid estimatedTimeHours`);
    }
  });
}
