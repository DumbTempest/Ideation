"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ExploreMain() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto mt-20 mb-20 px-4 pb-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        <span className="font-tektur bg-gradient-to-r from-zinc-100 to-zinc-300 text-transparent bg-clip-text">
          Explore our services
        </span>
      </h2>

      
      <div className="flex flex-col gap-12">

        {/* explore section 1st box*/}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_auto] gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hover-card group relative bg-slate-900/60 rounded-2xl px-10 py-12 backdrop-blur min-h-[200px]"
          >
            <h3 className="font-tektur text-xl font-semibold mb-3 text-pink-400 underline">
              Project Database
            </h3>
            <p className="text-slate-200 font-tektur leading-relaxed relative z-10">
              Browse hand-picked project ideas across multiple domains and
              difficulty levels to sharpen your skills with real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href="/ProjectDB">
              <button className="border-2 border-slate-600 hover:border-pink-400 bg-transparent relative z-10 font-tektur px-8 py-3 whitespace-nowrap rounded-lg transition-colors duration-300 text-white">
                <span>Explore Ideas</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* explore section 2nd box */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1.5fr] gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 md:order-1"
          >
            <Link href="/">
              <button className="border-2 border-slate-600 hover:border-pink-400 bg-transparent relative z-10 font-tektur px-8 py-3 whitespace-nowrap rounded-lg transition-colors duration-300 text-white text-lg">
                <span>Let's see</span>
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hover-card group relative bg-slate-900/60 rounded-2xl px-10 py-12 backdrop-blur order-1 md:order-2 min-h-[200px] "
          >
            <h3 className="font-tektur text-xl font-semibold mb-3 text-pink-400 underline text-right">
              Project Selection Helper
            </h3>
            <p className="text-slate-200 font-tektur leading-relaxed relative z-10 text-right">
              Answer a few questions and we'll help you choose a project based on
              your skill level and preferences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
