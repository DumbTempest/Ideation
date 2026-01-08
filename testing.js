import { p } from 'framer-motion/client';
import { testData } from './test_data.js';

const input = {
    domain: ["Web Dev"],
    techStack: ["HTML", "CSS", "JavaScript"],
    difficultyLevel: "newbie",
    effortLevel: "low",
    projectType: ["mini"]
}

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


function normalizeInput(input) {
    return {
        ...input,
        difficultyLevel: difficultyMap[input.difficultyLevel],
        effortLevel: effortMap[input.effortLevel]
    }
}

function normalizeProject(project) {
    return {
        ...project,
        difficultyLevel: difficultyMap[project.difficulty.level],
        effortLevel: effortMap[project.effort.level]
    };
}

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

function techStackScore(user, project) {

    if (project.techStack.length === 0 || !project.techStack) {
        return 0;
    }
    const StackSimilarityCount = SimilarityCount(user.techStack, project.techStack);
    const finalscore1 = StackSimilarityCount / project.techStack.length;
    return finalscore1;
}

function projectTypeScore(user, project) {
    if (user.projectTypes.includes(project.projectType)) {
        score = 1;
    } else {
        score = 0;
    }
    return score;
}


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


const weights = {
    tech: 0.35,
    domain: 0.25,
    difficulty: 0.15,
    effort: 0.10,
    projectType: 0.10,
    freshness: 0.05
};

function calculateFinalScore(user, project) {
    const scores = {
        techScore: techStackScore(user, project),
        domainScore: domainScore(user, project),
        difficultyScore: difficultyScore(user, project),
        effortScore: effortScore(user, project),
        projectTypeScore: projectTypeScore(user, project),
        recencyScore: recencyScore(project)
    };   


    const totalScore = scores.techScore * weights.tech +
        scores.domainScore * weights.domain +
        scores.difficultyScore * weights.difficulty +
        scores.effortScore * weights.effort +
        scores.projectTypeScore * weights.projectType +
        scores.recencyScore * weights.freshness;

    return totalScore;
}

function recommendProjects(user, projects, limit = 10) {
  return projects
    .map(project => {
      const { finalScore, scores } = calculateFinalScore(user, project);
      return {
        project,
        score: Number(finalScore.toFixed(3)),
        scores
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}


