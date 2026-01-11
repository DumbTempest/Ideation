"use client";

import { useState } from "react";
import Navbar from "@/components/custom/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import TagInputCustom from "@/components/custom/tagInputCustom";

export default function AddProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [projectType, setProjectType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [tags, setTags] = useState([]);
  const [techTags, setTechTags] = useState([]);
  const [domainTags, setDomainTags] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  const [effortLevel, setEffortLevel] = useState("");
  const [effortDescription, setEffortDescription] = useState("");

  const [links, setLinks] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addLink = () => setLinks([...links, ""]);
  const updateLink = (value, index) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      name,
      description,
      label,
      projectType,
      tags,
      techStack: techTags,
      domain: domainTags,
      difficulty: {
        level: difficulty,
        prerequisites,
      },
      effort: {
        level: effortLevel,
        description: effortDescription,
      },
      outcomes,
      links,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Project added successfully");

      setName("");
      setDescription("");
      setLabel("");
      setProjectType("");
      setDifficulty("");
      setTags([]);
      setTechTags([]);
      setDomainTags([]);
      setPrerequisites([]);
      setOutcomes([]);
      setEffortLevel("");
      setEffortDescription("");
      setLinks([""]);
    } catch {
      toast.error("Project creation failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto py-10 px-6 space-y-8">
        <h1 className="text-3xl font-bold">Add a New Project</h1>

        <Button asChild>
          <Link href="/ProjectDB/json-upload">Upload Bulk JSON</Link>
        </Button>

        <form onSubmit={submitProject} className="space-y-6">

          <div className="space-y-2">
            <Label className="text-zinc-300">Project Name</Label>
            <Input
              className="bg-black border-2 border-zinc-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label className="text-zinc-300">Description</Label>
            <Textarea
              className="bg-black border-2 border-zinc-700 text-white min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label className="text-zinc-300">Project Label</Label>
            <Input
              className="bg-black border-2 border-zinc-700 text-white"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label className="text-zinc-300">Project Type</Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="bg-black border-2 border-zinc-700">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectItem value="mini">mini</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="open-source">Open Source</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Project Tags</Label>
            <TagInputCustom tags={tags} setTags={setTags} />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Tech Stack</Label>
            <TagInputCustom tags={techTags} setTags={setTechTags} />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Domain</Label>
            <TagInputCustom tags={domainTags} setTags={setDomainTags} />
          </div>


          <div className="space-y-2">
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


          <div className="space-y-2">
            <Label className="text-zinc-300">Prerequisites</Label>
            <TagInputCustom
              tags={prerequisites}
              setTags={setPrerequisites}
            />
          </div>

          {/* Effort */}

          <div className="space-y-2">
            <Label className="text-zinc-300">Effort Level</Label>
            <Select value={effortLevel} onValueChange={setEffortLevel}>
              <SelectTrigger className="bg-black border-2 border-zinc-700">
                <SelectValue placeholder="Select effort level" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectItem value="low">low</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="slightly intensive">slightly intensive</SelectItem>
                <SelectItem value="crazy">crazy</SelectItem>
              </SelectContent>
            </Select>
          </div>



          <div className="space-y-2">
            <Label className="text-zinc-300">Effort Description</Label>
            <Textarea
              className="bg-black border-2 border-zinc-700 text-white"
              value={effortDescription}
              onChange={(e) => setEffortDescription(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label className="text-zinc-300">Outcomes</Label>
            <TagInputCustom tags={outcomes} setTags={setOutcomes} />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Related Links</Label>
            {links.map((link, i) => (
              <Input
                key={i}
                className="bg-black border-2 border-zinc-700 text-white"
                value={link}
                onChange={(e) => updateLink(e.target.value, i)}
              />
            ))}
            <Button
              type="button"
              variant="secondary"
              className="bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={addLink}
            >
              + Add another link
            </Button>
          </div>

          <Button type="submit" className="w-full bg-white hover:bg-gray-400 text-black" disabled={loading}>
            {loading ? "Submitting..." : "Submit Project"}
          </Button>
        </form>
      </div>
    </main>
  );
}
