import ProjectCard from "@/components/custom/projectCard";
import Navbar from "@/components/custom/navbar";

export default function ProjectsPage() {
  const projects = [
    {
      name: "Weather App",
      description: "Fetch and display live weather data.",
      domain: "Web Development",
      techStack: ["Next.js", "API", "Tailwind"],
      label: "eww",
      difficulty: "Easy"
    },
    {
      name: "Task Manager",
      description: "A simple app to track daily tasks.",
      domain: "Productivity",
      techStack: ["React", "LocalStorage"],
      label: "eww",
      difficulty: "Easy",
    },
    {
      name: "Blog Platform",
      description: "A minimal blogging system.",
      domain: "Content",
      techStack: ["Next.js", "Markdown"],
      label: "eww",
      difficulty: "Easy"
    },
    {
      name: "Quiz App",
      description: "Interactive quizzes with scoring.",
      domain: "Education",
      techStack: ["Next.js", "Shadcn"],
      label: "eww",
      difficulty: "Easy"
    },
    {
      name: "Recipe Finder",
      description: "Find recipes based on ingredients.",
      domain: "Lifestyle",
      techStack: ["React", "API"],
      label: "eww",
      difficulty: "Easy"
    },
    {
      name: "Portfolio Site",
      description: "A clean personal portfolio.",
      domain: "Web Design",
      techStack: ["Next.js", "Tailwind"],
      label: "eww",
      difficulty: "Easy"
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
            label={project.label}
            difficulty={project.difficulty}
          />
        ))}
      </div>
    </main>
  );
}
