"use client";

import { useState } from "react";
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
import Navbar from "@/components/custom/navbar";
import { TagInput } from "emblor";
import { toast } from "sonner";
import Link from "next/link";

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

  const [activeTagIndex, setActiveTagIndex] = useState(null);
  const [activeTechIndex, setActiveTechIndex] = useState(null);
  const [activeDomainIndex, setActiveDomainIndex] = useState(null);
  const [activePrereqIndex, setActivePrereqIndex] = useState(null);
  const [activeOutcomeIndex, setActiveOutcomeIndex] = useState(null);
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
      tags: tags.map((t) => t.text),
      techStack: techTags.map((t) => t.text),
      domain: domainTags.map((d) => d.text),
      difficulty: {
        level: difficulty,
        prerequisites: prerequisites.map((p) => p.text),
      },
      effort: {
        level: effortLevel,
        description: effortDescription,
      },
      outcomes: outcomes.map((o) => o.text),
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
    <main className="max-w-2xl mx-auto py-10 px-6">
      <Navbar />

      <h1 className="text-3xl font-bold mb-4">Add a New Project</h1>

      <Button type="button" className="mb-6" asChild>
        <Link href="/ProjectDB/json-upload">Upload Bulk JSON</Link>
      </Button>

      <form className="space-y-6" onSubmit={submitProject}>
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input
            className="border border-black border-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            className="min-h-[120px] border border-black border-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Project Label</Label>
          <Input
            placeholder="e.g. Start on path of 10x Coder"
            className="border border-black border-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Project Type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="border border-black border-2">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guided">Guided</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="exploratory">Exploratory</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="space-y-2">
          <Label>Project Tags</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              tags={tags}
              setTags={setTags}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              tags={techTags}
              setTags={setTechTags}
              activeTagIndex={activeTechIndex}
              setActiveTagIndex={setActiveTechIndex}
            />
          </div>
        </div>


        <div className="space-y-2">
          <Label>Domain</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              tags={domainTags}
              setTags={setDomainTags}
              activeTagIndex={activeDomainIndex}
              setActiveTagIndex={setActiveDomainIndex}
            />
          </div>
        </div>


        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="border border-black border-2">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newbie">Newbie</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="cracked">Cracked</SelectItem>
              <SelectItem value="10x">10x</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="space-y-2">
          <Label>Difficulty Prerequisites</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              tags={prerequisites}
              setTags={setPrerequisites}
              activeTagIndex={activePrereqIndex}
              setActiveTagIndex={setActivePrereqIndex}
            />
          </div>
        </div>


        <div className="space-y-2">
          <Label>Effort Level</Label>
          <Input
            className="border border-black border-2"
            value={effortLevel}
            onChange={(e) => setEffortLevel(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Effort Description</Label>
          <Textarea
            className="border border-black border-2"
            value={effortDescription}
            onChange={(e) => setEffortDescription(e.target.value)}
          />
        </div>


        <div className="space-y-2">
          <Label>Project Outcomes</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              tags={outcomes}
              setTags={setOutcomes}
              activeTagIndex={activeOutcomeIndex}
              setActiveTagIndex={setActiveOutcomeIndex}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Related Links</Label>
          {links.map((link, i) => (
            <Input
              key={i}
              className="border border-black border-2 mb-2"
              value={link}
              onChange={(e) => updateLink(e.target.value, i)}
            />
          ))}
          <Button type="button" variant="secondary" onClick={addLink}>
            + Add another link
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Project"}
        </Button>
      </form>
    </main>
  );
}
