'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/custom/navbar';

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/singleProj/${id}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch project');

        const data = await res.json();
        if (!data) {
          setNotFound(true);
          return;
        }

        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Loading project...
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center mt-10 text-red-400 font-semibold">
        Project not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white flex flex-col items-center">
      <Navbar />
      <div className="max-w-4xl bg-white/5 backdrop-blur-lg
                       border border-white/10
                        p-10 rounded-lg flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-6 font-tektur">
        {project.name}
      </h1>

      <div className="mt-2 text-sm text-purple-400">
        <span className="mr-2">{project.label}</span>•
        <span className="ml-2 capitalize">{project.projectType}</span>
      </div>

      <p className="mt-6 max-w-4xl text-zinc-300 text-center">
        {project.description}
      </p>


      {/* domain and techstack line */}
      <div className="mt-6 max-w-4xl flex justify-between w-full ">
        {project.domain?.length > 0 && (
          <section className="max-w-4xl ">
            <h2 className="text-lg font-semibold mb-2 font-tektur">Domain</h2>
            <div className="flex flex-wrap gap-2">
              {project.domain.map((d) => (
                <span key={d} className="px-2 py-1 bg-zinc-800 rounded text-sm">
                  {d}
                </span>
              ))}
            </div>
          </section>
        )}

        {project.techStack?.length > 0 && (
          <section className="max-w-4xl text-right">
            <h2 className="text-lg font-semibold mb-2 font-tektur">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 justify-end">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-zinc-800 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>



      {project.difficulty && (
        <section className="mt-6 max-w-4xl w-full">
          <h2 className="text-lg font-semibold mb-2 font-tektur">Difficulty</h2>
          <p className="text-zinc-400 capitalize">
            Level: {project.difficulty.level}
          </p>

          {project.difficulty.prerequisites?.length > 0 && (
            <ul className="list-disc list-inside text-zinc-400 mt-2">
              {project.difficulty.prerequisites.map((pre) => (
                <li key={pre}>{pre}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {project.effort && (
        <section className="mt-6 max-w-4xl w-full">
          <h2 className="text-lg font-semibold mb-2 font-tektur">Effort</h2>
          <p className="text-zinc-400 capitalize ">
            Level: {project.effort.level}
          </p>
          <p className="text-zinc-500 mt-1">
            {project.effort.description}
          </p>
        </section>
      )}

      {project.outcomes?.length > 0 && (
        <section className="mt-6 max-w-4xl w-full">
          <h2 className="text-lg font-semibold mb-2 font-tektur">Outcomes</h2>
          <ul className="list-disc list-inside text-zinc-400">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>
      )}

      {project.tags?.length > 0 && (
        <section className="mt-6 max-w-4xl w-full">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.links?.length > 0 && (
        <section className="mt-6 max-w-4xl w-full">
          <h2 className="text-lg font-semibold mb-2">Resources</h2>
          <ul className="list-disc list-inside text-blue-400">
            {project.links.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-xs text-zinc-600">
        Created on {new Date(project.createdAt).toLocaleDateString()}
      </p>
      </div>
    </main>
  );

}
