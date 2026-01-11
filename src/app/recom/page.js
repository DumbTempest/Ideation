"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TagInputCustom from "@/components/custom/tagInputCustom";
import { Button } from "@/components/ui/button";
import { normalizeInput, normalizeProject , recommendProjects } from "@/lib/recommendation/logic";

export default function RecomPage() {
  const [difficulty, setDifficulty] = useState("");
  const [effortLevel, setEffortLevel] = useState("");
  const [techTags, setTechTags] = useState([]);
  const [domainTags, setDomainTags] = useState([]);
//   const [projectType, setProjectType] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userInput = normalizeInput({
        techStack: techTags,
        domain: domainTags,
        difficultyLevel: difficulty,
        effortLevel: effortLevel,
        // projectType: projectType ? [projectType] : [],
      });

 
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");

      const projects = await res.json();

      const normalizedProjects = projects.map(normalizeProject);

      const recommendations = recommendProjects(
        userInput,
        normalizedProjects,
        5
      );

      setResults(recommendations);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-4xl flex flex-col items-center text-white">
        <h1 className="font-tektur text-3xl text-center mb-8">
          Fill the details and get recommendations
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
        >
          <div className="space-y-2">
            <Label className="text-zinc-300">Tech Stack</Label>
            <TagInputCustom tags={techTags} setTags={setTechTags} />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Domain</Label>
            <TagInputCustom tags={domainTags} setTags={setDomainTags} />
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label className="text-zinc-300">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-black border-2 border-zinc-700">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="newbie">Newbie</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="cracked">Cracked</SelectItem>
                  <SelectItem value="10x">10x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex-1">
              <Label className="text-zinc-300">Effort Level</Label>
              <Select value={effortLevel} onValueChange={setEffortLevel}>
                <SelectTrigger className="bg-black border-2 border-zinc-700">
                  <SelectValue placeholder="Select effort" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">
                    slightly intensive
                  </SelectItem>
                  <SelectItem value="crazy">crazy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2 flex-1">
              <Label className="text-zinc-300">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="bg-black border-2 border-zinc-700">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="mini">mini</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="open-source">Open Source</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-black hover:bg-zinc-300 mt-4"
          >
            {loading ? "Recommending..." : "Get Recommendations"}
          </Button>
        </form>

    
        {results.length > 0 && (
          <div className="w-full mt-12 space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Recommended Projects
            </h2>

            {results.map(({ project, score }) => (
              <div
                key={project._id}
                className="border border-zinc-700 rounded-lg p-5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {project.name}
                  </h3>
                  <span className="text-sm text-zinc-400">
                    Score: {score}
                  </span>
                </div>

                <p className="text-zinc-400 mt-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs border border-zinc-600 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
