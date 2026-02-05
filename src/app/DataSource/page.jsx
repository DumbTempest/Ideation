"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Navbar from "@/components/custom/navbar";

export default function SourcesPage() {
  const sources = [
  {
    id: 1,
    name: "The Cool Coders",
    link: "https://github.com/The-Cool-Coders/Project-Ideas-And-Resources",
  },
  {
    id: 2,
    name: "fnplus",
    link: "https://github.com/fnplus/community-project-ideas",
  },
  {
    id: 3,
    name: "CodeCrafters",
    link: "https://codecrafters.io/blog/programming-project-ideas",
  },
  {
    id: 4,
    name: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/html/web-development-projects/",
  },
  {
    id: 5,
    name: "GitHub – Company-wise Projects",
    link: "https://github.com/nishant-Tiwari24/company-wise-projects",
  },
  {
    id: 6,
    name: "GitHub – Project Ideas",
    link: "https://github.com/KelvinQiu802/project-ideas?tab=readme-ov-file",
  },
  {
    id: 7,
    name: "GitHub – Cloud Engineering Projects",
    link: "https://github.com/madebygps/cloud-engineering-projects",
  },
];

  return (
    <>
    <Navbar />
   
  <div className="min-h-screen bg-black flex mt-10 justify-center px-6 text-white">
    <div className="w-full max-w-5xl flex flex-col items-center space-y-8">

      <h1 className="font-tektur text-3xl text-center">
        Sources
      </h1>

      <div className="w-full border border-zinc-700  overflow-hidden bg-zinc-900/60 backdrop-blur">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow>
              <TableHead className="text-zinc-400">S.No</TableHead>
              <TableHead className="text-zinc-400">Source Name</TableHead>
              <TableHead className="text-zinc-400">Source Link</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sources.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan="3"
                  className="text-center text-zinc-500 py-6"
                >
                  No sources added
                </TableCell>
              </TableRow>
            ) : (
              sources.map((s, i) => (
                <TableRow
                  key={s.id}
                  className="odd:bg-zinc-900/40 even:bg-zinc-900/20 border-zinc-800"
                >
                  <TableCell className="text-zinc-300">
                    {i + 1}
                  </TableCell>
                  <TableCell className="text-zinc-200">
                    {s.name}
                  </TableCell>
                  <TableCell>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                    >
                      {s.link}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  </div>
   </>
);

}