"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";

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
  <>
  <Navbar />
  <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
    <div className="w-full max-w-4xl flex flex-col items-center">

      <h1 className="font-tektur text-3xl text-center mb-8">
        Upload Project via JSON
      </h1>

      <div className="w-full space-y-6">
        <Textarea
          placeholder={`Paste JSON here...\nSupports:\n- A single object\n- Multiple objects on new lines\n- A full JSON array`}
          className="min-h-[320px] bg-black border-2 border-zinc-700 text-white"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        <Button
          className="w-full bg-white text-black hover:bg-zinc-300"
          size="lg"
          onClick={submitJSON}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit JSON"}
        </Button>
      </div>

    </div>
  </div>
    </>
);

}
