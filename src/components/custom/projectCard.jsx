"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function FadeText({ children, lines }) {
  const ref = useRef(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * lines;

    requestAnimationFrame(() => {
      setOverflow(el.scrollHeight > maxHeight + 2);
    });
  }, [children, lines]);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        lineHeight: "1.5rem",
        height: `calc(1.5rem * ${lines})`,
      }}
    >
      <p
        ref={ref}
        className="text-sm text-slate-400 whitespace-pre-wrap"
      >
        {children}
      </p>

      {overflow && (
  <div
    className="
      pointer-events-none absolute
      bottom-0 left-0 w-full
      h-[0.9rem]
      bg-gradient-to-t
      from-slate-900/95
      via-slate-900/60
      to-transparent
    "
  />
)}
    </div>
  );
}

export default function ProjectCard({
  name,
  description,
  domain,
  techStack,
  label,
  difficulty,
}) {
  return (
    <Card className="w-full max-w-md h-[250px] bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle className="text-white text-lg">
            {name}
          </CardTitle>

          <div className="mt-1">
            <FadeText lines={2}>{description}</FadeText>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between min-h-[50px]">
            <div className="w-[60%]">
              <p className="text-sm font-semibold text-slate-200">
                Domain
              </p>
              <p className="text-sm text-slate-400 overflow-hidden whitespace-nowrap text-ellipsis">
                {Array.isArray(domain) ? domain.join(", ") : domain}
              </p>
            </div>

            <div className="text-right w-[35%]">
              <p className="text-sm font-semibold text-slate-200">
                Difficulty
              </p>
              <p className="text-sm text-slate-400">
                {difficulty}
              </p>
            </div>
          </div>

          <div className="flex justify-between min-h-[50px]">
            <div className="w-[60%]">
              <p className="text-sm font-semibold text-slate-200">
                Tech Stack
              </p>
              <p className="text-sm text-slate-400 overflow-hidden whitespace-nowrap text-ellipsis">
                {Array.isArray(techStack) ? techStack.join(", ") : techStack}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
