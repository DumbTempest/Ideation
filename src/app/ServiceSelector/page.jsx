"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/custom/navbar";
import Link from "next/link";
export default function ServiceSelector() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Choose a Service
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="rounded-2xl  border p-6 cursor-pointer hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  Project Database
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-gray-600">
                  Select a Project from our database,which we have collected
                  from hundreds of repositories and resources.
                </p>
                <Button asChild className="w-full" size="lg">
                  <Link href="/ProjectDB">Select</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="rounded-2xl border p-6 cursor-pointer hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  Project Selection Helper
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-gray-600">
                  We will ask you some questions and help u choose a project
                  based on your skill level and preferences.
                </p>
                <Button className="w-full" size="lg">
                  Select
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
