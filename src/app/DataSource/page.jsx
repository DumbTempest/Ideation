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
      name: "React Documentation",
      link: "https://react.dev",
    },
    {
      id: 2,
      name: "MDN Web Docs",
      link: "https://developer.mozilla.org",
    },
    {
      id: 3,
      name: "Next.js Guide",
      link: "https://nextjs.org/docs",
    },
  ];

  return (
    <>
      <div className="bg-slate-950 min-h-screen">
        <Navbar hamburgercolor="#6d21bb" />

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-white">
            Sources
          </h1>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur">
            <Table>
              <TableHeader className="bg-slate-900">
                <TableRow>
                  <TableHead className="text-slate-300">S.No</TableHead>
                  <TableHead className="text-slate-300">Source Name</TableHead>
                  <TableHead className="text-slate-300">Source Link</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sources.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan="3"
                      className="text-center text-slate-500 py-6"
                    >
                      No sources added
                    </TableCell>
                  </TableRow>
                ) : (
                  sources.map((s, i) => (
                    <TableRow
                      key={s.id}
                      className="odd:bg-slate-900/40 even:bg-slate-900/20 border-slate-800"
                    >
                      <TableCell className="text-slate-300">
                        {i + 1}
                      </TableCell>
                      <TableCell className="text-slate-200">
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