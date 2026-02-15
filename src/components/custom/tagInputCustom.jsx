"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TagInputCustom({
  tags,
  setTags,
  placeholder = "Type and press Enter",
}) {
  const [value, setValue] = useState("");

  const addTag = () => {
    const v = value.trim();
    if (!v || tags.includes(v)) return;
    setTags([...tags, v]);
    setValue("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder={placeholder}
        className="
          w-full rounded-xl
          bg-black text-white
          border-2 border-zinc-700
          px-4 py-3
          outline-none
          focus:border-white
        "
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-zinc-900
              border border-zinc-700
              text-white
            "
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
