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
    <Navbar />
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sources</h1>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Source Name</TableHead>
              <TableHead>Source Link</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sources.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center text-gray-500 py-4"
                >
                  No sources added
                </TableCell>
              </TableRow>
            ) : (
              sources.map((s, i) => (
                <TableRow
                  key={s.id}
                  className="odd:bg-gray-50 even:bg-white"
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>
                    <a
                      href={s.link}
                      className="underline text-blue-600"
                      target="_blank"
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
    </>
  );
}
