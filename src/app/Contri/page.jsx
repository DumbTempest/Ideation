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
  const [difficulty, setDifficulty] = useState("");
  const [label, setLabel] = useState("");

  const [links, setLinks] = useState([""]);
  const [techTags, setTechTags] = useState([]);
  const [activeTechIndex, setActiveTechIndex] = useState(null);
  const [domainTags, setDomainTags] = useState([]);
  const [activeDomainIndex, setActiveDomainIndex] = useState(null);

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
      techStack: techTags.map((t) => t.text),
      domain: domainTags.map((d) => d.text),
      difficulty,
      label,
      links,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Project Added Yipeeee!");

      setName("");
      setDescription("");
      setDifficulty("");
      setLabel("");
      setLinks([""]);
      setTechTags([]);
      setDomainTags([]);
    } catch (error) {
      toast.error("Event has not been created");
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
            placeholder="Enter project name"
            className="border border-black border-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Clear Description of the Project</Label>
          <Textarea
            placeholder="Describe the project clearly..."
            className="min-h-[120px] border border-black border-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <div className="border border-black border-2 rounded-md">
            <TagInput
              placeholder="Write tech"
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
              placeholder="eg: Web Dev, ML, AI"
              tags={domainTags}
              setTags={setDomainTags}
              activeTagIndex={activeDomainIndex}
              setActiveTagIndex={setActiveDomainIndex}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <Select onValueChange={setDifficulty} value={difficulty}>
            <SelectTrigger className="border border-black border-2">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10x">10x</SelectItem>
              <SelectItem value="newbie">Newbie</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="cracked">Cracked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Label</Label>
          <Input
            placeholder="Enter any special label"
            className="border border-black border-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Similar Project Links (Optional)</Label>

          {links.map((link, index) => (
            <Input
              key={index}
              placeholder="https://example.com"
              value={link}
              className="mb-2 border border-black border-2"
              onChange={(e) => updateLink(e.target.value, index)}
            />
          ))}

          <Button variant="secondary" type="button" onClick={addLink}>
            + Add another link
          </Button>
        </div>

        <Button
          className="w-full mb-8"
          size="lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </Button>
      </form>
    </main>
  );
}
