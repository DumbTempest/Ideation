"use client";

import { useState } from "react";
import Navbar from "@/components/custom/navbar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function JsonUploadPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);

  const submitJSON = async () => {
    try {
      setLoading(true);
      let parsed;
      try {
        parsed = JSON.parse(jsonInput);
      } catch {
        const lines = jsonInput
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        parsed = lines.map((line) => JSON.parse(line));
      }

      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      const res = await fetch("/api/projects/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Projects saved successfully!");
      setJsonInput("");
    } catch (error) {
      toast.error("Invalid JSON or upload failed");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Upload Project via JSON</h1>

      <Textarea
        placeholder={`Paste JSON here...\nSupports:\n- A single object\n- Multiple objects on new lines\n- A full JSON array`}
        className="min-h-[300px] border border-black border-2"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <Button
        className="mt-4 w-full"
        size="lg"
        onClick={submitJSON}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit JSON"}
      </Button>
    </main>
  );
}
