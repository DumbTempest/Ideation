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
import { motion } from "framer-motion";
import { TagInput } from "emblor";

export default function AddProjectPage() {
  const [links, setLinks] = useState([""]);
  const [techTags, setTechTags] = useState([]);
  const [activeTechIndex, setActiveTechIndex] = useState(null);
  const [domainTags, setDomainTags] = useState([]);
  const [activeDomainIndex, setActiveDomainIndex] = useState(null);

  const addLink = () => setLinks([...links, ""]);
  const updateLink = (value, index) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const FocusWrapper = ({ children }) => {
    const [focused, setFocused] = useState(false);

    return (
      <motion.div
        animate={{ scale: focused ? 1.03 : 1 }}
        transition={{ duration: 0.2 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}

      >
        {children}
      </motion.div>
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8">Add a New Project</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label>Project Name</Label>
          <FocusWrapper>
            <Input placeholder="Enter project name" className="border border-black border-2" />
            
          </FocusWrapper>
        </div>

        <div className="space-y-2">
          <Label>Clear Description of the Project</Label>
          <FocusWrapper>
            <Textarea
              placeholder="Describe the project clearly..."
              className="min-h-[120px] border border-black border-2"
            />
          </FocusWrapper>
        </div>

        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <FocusWrapper>
            <div className="border border-black border-2 p-0 rounded-md">
            <TagInput
              placeholder="Write tech"
              tags={techTags}
              setTags={setTechTags}
              activeTagIndex={activeTechIndex}
              setActiveTagIndex={setActiveTechIndex}
              className="outline outline-1 outline-black-300 focus:outline-black-500"
            />
            </div>
          </FocusWrapper>
        </div>

        <div className="space-y-2">
          <Label>Domain</Label>
          <FocusWrapper>
            <div className="border border-black border-2 p-0 rounded-md">
            <TagInput
              placeholder="eg: Web Dev, ML, AI"
              tags={domainTags}
              setTags={setDomainTags}
              activeTagIndex={activeDomainIndex}
              setActiveTagIndex={setActiveDomainIndex}
              
            />
            </div>
          </FocusWrapper>
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
            <Select>
              <SelectTrigger className="border border-black border-2">
                <SelectValue placeholder="Select difficulty" className="text-blue" />
              </SelectTrigger>
              <SelectContent className="border border-black border-2 ">
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
            <FocusWrapper key={index}>
              <Input
                placeholder="https://example.com"
                value={link}
                className="mb-2 border border-black border-2"
                onChange={(e) => updateLink(e.target.value, index)}
              />
            </FocusWrapper>
          ))}

          <Button variant="secondary" type="button" onClick={addLink}>
            + Add another link
          </Button>
        </div>

        <FocusWrapper>
          <Button className="w-full mb-8" size="lg">
            Submit Project
          </Button>
        </FocusWrapper>
      </form>
    </main>
  );
}
