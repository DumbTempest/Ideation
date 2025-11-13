"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/custom/navbar";

export default function AddProjectPage() {
  const [links, setLinks] = useState([""]);

  const addLink = () => {
    setLinks([...links, ""]);
  };

  const updateLink = (value, index) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8">Add a New Project</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input placeholder="Enter project name" />
        </div>

        <div className="space-y-2">
          <Label>Clear Description of the Project</Label>
          <Textarea placeholder="Describe the project clearly..." className="min-h-[120px]" />
        </div>

        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <Input placeholder="e.g. Next.js, React, MongoDB" />
        </div>

        <div className="space-y-2">
          <Label>Domain</Label>
          <Input placeholder="e.g. Web Development, AI, Mobile" />
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <Select>
            <SelectTrigger>
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
          <Label>Similar Project Links (Optional)</Label>

          {links.map((link, index) => (
            <Input
              key={index}
              placeholder="https://example.com"
              value={link}
              className="mb-2"
              onChange={(e) => updateLink(e.target.value, index)}
            />
          ))}

          <Button variant="secondary" type="button" onClick={addLink}>
            + Add another link
          </Button>
        </div>

        <Button className="w-full" size="lg">
          Submit Project
        </Button>
      </form>
    </main>
  );
}
