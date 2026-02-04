'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/custom/navbar';

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
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
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch(`/api/projects/milestone/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setMilestones(data);
      } catch {}
    };

    if (id) fetchMilestones();
  }, [id]);

  const majorMilestones = milestones
    .filter(m => m.type === 'major')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const minorsByParent = milestones
    .filter(m => m.type === 'minor')
    .reduce((acc, m) => {
      acc[m.parentId] = acc[m.parentId] || [];
      acc[m.parentId].push(m);
      return acc;
    }, {});

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Loading project...
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="text-center mt-10 text-red-400 font-semibold">
        Project not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white flex flex-col items-center">
      <Navbar />

      <div className="max-w-4xl bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-lg w-full">
        <h1 className="text-4xl font-bold mt-6 font-tektur text-center">
          {project.name}
        </h1>

        <div className="mt-2 text-sm text-purple-400 text-center">
          <span className="mr-2">{project.label}</span>•
          <span className="ml-2 capitalize">{project.projectType}</span>
        </div>

        <p className="mt-6 text-zinc-300 text-center">
          {project.description}
        </p>

        <div className="mt-6 flex justify-between w-full">
          {project.domain?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 font-tektur">Domain</h2>
              <div className="flex flex-wrap gap-2">
                {project.domain.map(d => (
                  <span key={d} className="px-2 py-1 bg-zinc-800 rounded text-sm">
                    {d}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.techStack?.length > 0 && (
            <section className="text-right">
              <h2 className="text-lg font-semibold mb-2 font-tektur">Tech Stack</h2>
              <div className="flex flex-wrap gap-2 justify-end">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-zinc-800 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {project.difficulty && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2 font-tektur">Difficulty</h2>
            <p className="text-zinc-400 capitalize">
              Level:{' '}
              {typeof project.difficulty === 'string'
                ? project.difficulty
                : project.difficulty.level}
            </p>
          </section>
        )}

        {project.effort && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2 font-tektur">Effort</h2>
            <p className="text-zinc-400 capitalize">
              Level: {project.effort.level}
            </p>
            <p className="text-zinc-500 mt-1">
              {project.effort.description}
            </p>
          </section>
        )}

        {project.outcomes?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2 font-tektur">Outcomes</h2>
            <ul className="list-disc list-inside text-zinc-400">
              {project.outcomes.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
        )}

        {majorMilestones.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 font-tektur">
              Project Milestones
            </h2>

            <div className="space-y-6">
              {majorMilestones.map((major, idx) => (
                <div
                  key={major._id}
                  className="p-5 rounded-lg border border-white/10 bg-white/5"
                >
                  <h3 className="text-xl font-semibold">
                    {idx + 1}. {major.title}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    {major.objective}
                  </p>

                  {minorsByParent[major._id]?.length > 0 && (
                    <ul className="mt-4 space-y-3 pl-4 border-l border-white/10">
                      {minorsByParent[major._id].map(minor => (
                        <li key={minor._id}>
                          <p className="font-medium text-zinc-200">
                            {minor.title}
                          </p>
                          <p className="text-zinc-400 text-sm">
                            {minor.objective}
                          </p>
                          {minor.estimatedTimeHours && (
                            <p className="text-xs text-purple-400 mt-1">
                              ⏱ {minor.estimatedTimeHours} hours
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 text-xs text-zinc-600 text-center">
          Created on {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
