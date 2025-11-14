import ProjectCard from "@/components/custom/projectCard";
import Navbar from "@/components/custom/navbar";
export default function ProjectsPage() {
  const projects = [
    {
      name: "Weather App",
      description: "Fetch and display live weather data.",
      domain: "Web Development",
      techStack: ["Next.js", "API", "Tailwind"],
    },
    {
      name: "Task Manager",
      description: "A simple app to track daily tasks.",
      domain: "Productivity",
      techStack: ["React", "LocalStorage"],
    },
    {
      name: "Blog Platform",
      description: "A minimal blogging system.",
      domain: "Content",
      techStack: ["Next.js", "Markdown"],
    },
    {
      name: "Quiz App",
      description: "Interactive quizzes with scoring.",
      domain: "Education",
      techStack: ["Next.js", "Shadcn"],
    },
    {
      name: "Recipe Finder",
      description: "Find recipes based on ingredients.",
      domain: "Lifestyle",
      techStack: ["React", "API"],
    },
    {
      name: "Portfolio Site",
      description: "A clean personal portfolio.",
      domain: "Web Design",
      techStack: ["Next.js", "Tailwind"],
    },
  ];

  return (
    <main className="min-h-screen px-6 py-10">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-10">Database</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            description={project.description}
            domain={project.domain}
            techStack={project.techStack}
          />
        ))}
      </div>
    </main>
  );
}
