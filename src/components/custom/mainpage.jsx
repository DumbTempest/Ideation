'use client';

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Link from "next/link";
import ExploreMain from "./exploreMain";
import Prism from "./Prism";

export default function Home() {
  const isDark = true;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none prism-smooth">
          <Prism
            animationType="rotate"
            scale={2.5}          
            speed={0.3}     
            intensity={0.5}
            noise={0}
            grain={0}
            dither={false}
            dpr={1.25}        
            paused={false}
          />

        </div>

        <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <Navbar hamburgercolor={isDark ? "#6d21bb" : "#6d21bb"} />

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <span className="relative inline-block px-5 py-2 text-sm font-tektur text-slate-300">
                <span className="absolute inset-0 -skew-x-12 bg-slate-900/60 border border-slate-700" />
                <span className="relative block -skew-x-12">
                  For All Skill Levels
                </span>
              </span>
            </div>


            <h1 className="font-tektur text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span
                className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 text-transparent bg-clip-text"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Find your next
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-transparent bg-clip-text"
                style={{ WebkitTextStroke: "1px #3b82f6" }}
              >
                project idea with us
              </span>
            </h1>

            <p className="font-tektur text-white text-lg md:text-xl mb-12">
              Discover the perfect project to practice your skills in any tech stack.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
              <Button className="w-full sm:w-auto bg-purple-800/50 -skew-x-12 hover:bg-purple-600 text-white px-10 py-4 rounded-none text-base font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(109,33,187,0.5)] hover:translate-y-[-2px]">
                <Link href="/ServiceSelector" className="flex  font-tektur items-center gap-2">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </Button>

              <Button className="w-full ml-4 -skew-x-12 sm:w-auto font-tektur bg-transparent hover:bg-slate-600/50 border-2 border-slate-700 hover:border-black text-slate-200 px-10 py-4 rounded-none text-base font-medium tracking-wide transition-all duration-300 hover:translate-y-[-2px] text-black">
              <Link href="/recom" className="flex items-center gap-2">
                Browse Ideas
                </Link>
              </Button>
            </div>

            {/* <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-tektur">100+ Project Ideas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-tektur">All Skill Levels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-tektur">Any Tech Stack</span>
              </div>
            </div> */}
          </div>
        </main>
      </div>

      <div className="bg-black">

        <ExploreMain />
      </div>
    </>
  );
}
