import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Link from "next/link";
import VantaBackground from "./VantaBackground";
export default function Home() {
  const isDark = true;

  return (
    <>
       <VantaBackground />
      <div className="bg-black/40 min-h-screen overflow-hidden">
        <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" /> */}

          <Navbar hamburgercolor={isDark ? "#6d21bb" : "#6d21bb"} />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <span className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
                For All Skill Levels
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight">
              <span
                className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-transparent bg-clip-text font-bold"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Find your next
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-transparent bg-clip-text">
                project idea with us
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl mb-10">
              Discover the perfect project to practice your skills in any tech stack.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="w-full sm:w-auto bg-[#6d21bb] hover:bg-purple-700 text-white font-medium px-8 py-3 text-md rounded-3xl">
                <Link href="/ServiceSelector">Get Started</Link>
              </Button>

              <Button className="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 text-md font-medium px-8 py-3 rounded-lg">
                Browse Ideas
              </Button>
            </div>
          </div>
        </main>

        <hr className="border-slate-800 my-16 mx-20"  />

        <section className="relative z-10 w-full max-w-6xl mx-auto mt-20 mb-20 px-4 pb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-transparent bg-clip-text">
              Explore our services
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur transition hover:border-purple-500/50 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Curated Project Ideas
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Browse hand-picked project ideas across multiple domains and
                difficulty levels to sharpen your skills with real-world problems.
              </p>

              <Button className="bg-[#6d21bb] hover:bg-purple-700 text-white rounded-xl px-6">
                Explore Ideas
              </Button>
            </div>

            <div className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur transition hover:border-fuchsia-500/50 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Guided Learning Paths
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Follow structured learning paths with resources and milestones to
                convert ideas into complete, portfolio-ready projects.
              </p>

              <Button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl px-6">
                View Paths
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
