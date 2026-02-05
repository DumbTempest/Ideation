"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/custom/navbar";
import Link from "next/link";
import Footer from "@/components/custom/footer";

export default function ServiceSelector() {
  return (
    <>
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" /> */}

      <div className="bg-black
       min-h-screen overflow-hidden">
        <Navbar hamburgercolor="#6d21bb" />

        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r font-tektur from-zinc-100 to-zinc-300 text-transparent bg-clip-text" >
              Choose a Service
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 cursor-pointer backdrop-blur transition hover:border-purple-500/50">
                
                <CardHeader>
                  <CardTitle className="text-xl font-semibold font-tektur text-center text-white">
                    Project Database
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 ">
                  <p className="text-slate-400 ">
                    Select a project from our database curated from hundreds of
                    repositories and trusted resources.
                  </p>
                  <Button asChild className="w-full bg-[#6d21bb] font-tektur hover:bg-purple-700">
                    <Link href="/ProjectDB">Select</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 cursor-pointer backdrop-blur transition hover:border-fuchsia-500/50">
                
                <CardHeader>
                  <CardTitle className="text-xl font-semibold font-tektur text-center text-white">
                    Project Selection Helper
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-slate-400">
                    Answer a few questions and we’ll help you choose a project
                    based on your skill level and preferences.
                  </p>
                  <Button className="w-full bg-slate-800 font-tektur hover:bg-slate-700 border border-slate-700 text-white">
                    <Link href="/recom">Select</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
