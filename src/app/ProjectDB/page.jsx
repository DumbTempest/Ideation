'use client';

import ProjectCard from "@/components/custom/projectCard";
import Navbar from "@/components/custom/navbar";
import { useEffect, useState } from "react";
import DbSearchbar from "@/components/custom/dbSearchbar";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch("/api/projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setAllProjects(data || []);
      setProjects(data || []);
    };
    getProjects();
  }, []);

  const handleSearch = (query) => {
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      setProjects(allProjects);
      return;
    }

    setProjects(
      allProjects.filter((project) => {
        const name = (project.name || "").toLowerCase();
        const desc = (project.description || "").toLowerCase();
        const domain = project.domain?.join(" ").toLowerCase() || "";

        return name.includes(q) || desc.includes(q) || domain.includes(q);
      })
    );
  };

  const length = projects.length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-transparent bg-clip-text font-bold" style={{ WebkitTextStroke: "1px white" }}>Database ({length})</h1>


      <div className="mb-8">
        <DbSearchbar typedText="" onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id }
            id ={project._id}
            name={project.name}
            description={project.description}
            domain={project.domain}
            techStack={project.techStack}
            label={project.label}
            difficulty={project.difficulty}
          />
        ))}
      </div>
    </main>
  );
}
