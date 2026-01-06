"use client";

import Link from "next/link";

export default function ExploreMain() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto mt-20 mb-20 px-4 pb-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        <span className="font-tektur bg-gradient-to-r from-zinc-100 to-zinc-300 text-transparent bg-clip-text">
          Explore our services
        </span>
      </h2>

      {/* explore box parent div      */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* explore section 1st box */}
        <div className="hover-card group relative bg-slate-900/60 rounded-2xl p-8 backdrop-blur transition hover:-translate-y-1">
          <h3 className="font-tektur text-xl font-semibold mb-3 text-pink-400 underline">
            Project Database
          </h3>

          <p className="text-slate-400 font-tektur mb-6 leading-relaxed relative z-10">
            Browse hand-picked project ideas across multiple domains and
            difficulty levels to sharpen your skills with real-world problems.
          </p>

          <Link href="/ProjectDB">
            <button className="border-btn relative z-10 font-tektur">
              <span>Explore Ideas</span>
            </button>
          </Link>
        </div>

        {/* explore section 2nd box */}
        <div className="hover-card group relative bg-slate-900/60 rounded-2xl p-8 backdrop-blur transition hover:-translate-y-1">
          <h3 className="font-tektur text-xl font-semibold mb-3 text-pink-400 underline">
            Project Selection Helper
          </h3>
          <p className="text-slate-400 font-tektur mb-12 leading-relaxed relative z-10">
            Answer a few questions and we’ll help you choose a project based on
            your skill level and preferences
          </p>

          <Link href="/">
            <button className="border-btn relative z-10 font-tektur">
              <span>View Paths</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
