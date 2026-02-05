'use client';

import ProjectCard from "@/components/custom/projectCard";
import Navbar from "@/components/custom/navbar";
import { useEffect, useState } from "react";
import DbSearchbar from "@/components/custom/dbSearchbar";
import Footer from "@/components/custom/footer";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      const res = await fetch("/api/projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setAllProjects(data || []);
      setProjects(data || []);
      setLoading(false);
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
    <>
    <main className="min-h-screen bg-black px-6 pt-14 pb-10">
      <Navbar />

      <h1
        className="text-3xl font-bold text-center mb-10 text-white font-tektur"
      >
        Database ({length})
      </h1>

      <div className="mb-8">
        <DbSearchbar typedText="" onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400 text-sm">Loading projects...</p>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              description={project.description}
              domain={project.domain}
              techStack={project.techStack}
              label={project.label}
              difficulty={project.difficulty.level}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No projects found.</p>
      )}
      
    </main>
    <div>
        <Footer />
      </div>
      </>
  );
}
