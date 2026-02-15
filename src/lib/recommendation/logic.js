
// maps and shit
const difficultyMap = {
    "newbie": 1,
    "moderate": 2,
    "cracked": 3,
    "10x": 4
}
const effortMap = {
    "low": 1,
    "medium": 2,
    "slightly intensive": 3,
    "crazy": 4
}

const Project_types = new Set([
    "mini",
    "balanced",
    "research",
    "open-source"
]);
// const weights = {
//     tech: 0.35,
//     domain: 0.25,
//     difficulty: 0.15,
//     effort: 0.10,
//     projectType: 0.10,
//     freshness: 0.05
// };
const weights = {
    tech: 0.40,       
    domain: 0.30,      
    difficulty: 0.15,  
    effort: 0.10,     
    freshness: 0.05    
};



// helpers
function SimilarityCount(a = [], b = []) {
    let score = 0;
    for (const value of a) {
        for (const val of b) {
            if (value === val) {
                score += 1;
            }
        }
    }
    return score;
}
function daysbetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const difference = Math.round(Math.abs((date1 - date2) / oneDay));
    return difference;
}
function normalizeToken(value){
    if (typeof value !== "string") return value;

  return value
    .toLowerCase()
    .trim()
    .replace(/[-_]+/g, " ")  
    .replace(/\s+/g, " ")
}



// normalizer
function normalizeInput(user) {
  let techStack = [];
  let domain = [];
  let difficultyLevel = 0;
  let effortLevel = 0;

  if (Array.isArray(user.techStack)) {
    techStack = user.techStack.map(normalizeToken);
  }

  if (Array.isArray(user.domain)) {
    domain = user.domain.map(normalizeToken);
  }

  if (typeof user.difficultyLevel === "string") {
    const key = normalizeToken(user.difficultyLevel);
    if (difficultyMap[key] !== undefined) {
      difficultyLevel = difficultyMap[key];
    }
  }

  if (typeof user.effortLevel === "string") {
    const key = normalizeToken(user.effortLevel);
    if (effortMap[key] !== undefined) {
      effortLevel = effortMap[key];
    }
  }

  return {
    ...user,
    techStack,
    domain,
    difficultyLevel,
    effortLevel,
  };
}
function normalizeProject(project) {
  let difficulty;
  let effort;

  if (typeof project.difficulty === "string") {
    difficulty = project.difficulty;
  } else if (project.difficulty && typeof project.difficulty.level === "string") {
    difficulty = project.difficulty.level;
  } else {
    difficulty = undefined;
  }


  if (typeof project.effort === "string") {
    effort = project.effort;
  } else if (project.effort && typeof project.effort.level === "string") {
    effort = project.effort.level;
  } else {
    effort = undefined;
  }

  let techStack = [];
  if (Array.isArray(project.techStack)) {
    techStack = project.techStack.map(normalizeToken);
  }

  let domain = [];
  if (Array.isArray(project.domain)) {
    domain = project.domain.map(normalizeToken);
  }

  let difficultyLevel = 0;
  if (typeof difficulty === "string") {
    const key = normalizeToken(difficulty);
    if (difficultyMap[key] !== undefined) {
      difficultyLevel = difficultyMap[key];
    }
  }

  let effortLevel = 0;
  if (typeof effort === "string") {
    const key = normalizeToken(effort);
    if (effortMap[key] !== undefined) {
      effortLevel = effortMap[key];
    }
  }

  return {
    ...project,
    techStack,
    domain,
    difficultyLevel,
    effortLevel,
  };
}




// scoring functions
function techStackScore(user, project) {

    if (project.techStack.length === 0 || !project.techStack) {
        return 0;
    }
    const StackSimilarityCount = SimilarityCount(user.techStack, project.techStack);
    const finalscore1 = StackSimilarityCount / project.techStack.length;
    return finalscore1;
}
// function projectTypeScore(user, project) {

//     let score = 0;
//     if (user.projectType.includes(project.projectType)) {
//         score = 1;
//     } 
//     return score;
// }
function domainScore(user, project) {
    if (project.domain.length === 0 || !project.domain) {
        return 0;
    }

    const DomainSimilarityCount = SimilarityCount(user.domain, project.domain);
    const finalscore3 = DomainSimilarityCount / project.domain.length;
    return finalscore3;
}
function difficultyScore(user, project) {
    const diff = Math.abs(
        user.difficultyLevel - project.difficultyLevel
    );
    const finalscore4 = 1 - diff / 3;
    return finalscore4;
}
function effortScore(user, project) {
    const eff = Math.abs(user.effortLevel - project.effortLevel);
    const finalscore5 = 1 - eff / 3;
    return finalscore5;
}
function recencyScore(project) {
    const today = new Date();
    const createdAt = new Date(project.createdAt);
    const daysDiff = daysbetween(today, createdAt);
    const finalscore6 = 1 / (1 + daysDiff / 30);
    return finalscore6;
}




function calculateFinalScore(user, project) {
    const scores = {
        techScore: techStackScore(user, project),
        domainScore: domainScore(user, project),
        difficultyScore: difficultyScore(user, project),
        effortScore: effortScore(user, project),
        // projectTypeScore: projectTypeScore(user, project),
        recencyScore: recencyScore(project)
    };   


    const totalScore = scores.techScore * weights.tech +
        scores.domainScore * weights.domain +
        scores.difficultyScore * weights.difficulty +
        scores.effortScore * weights.effort +
        // scores.projectTypeScore * weights.projectType +
        scores.recencyScore * weights.freshness;

    return { totalScore, scores };
}

function recommendProjects(user, projects, limit = 10) {
  return projects
    .map(project => {
      const { totalScore, scores } = calculateFinalScore(user, project);
      return {
        project,
        score: Number(totalScore.toFixed(3)),
        scores
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export { normalizeInput, normalizeProject , recommendProjects };