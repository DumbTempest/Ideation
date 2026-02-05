'use client';

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';

export default function DbSearchbar({ typedText = "", onSearch }) {
  const [value, setValue] = useState(typedText);
  const [debouncedValue] = useDebounce(value, 700);

  useEffect(() => {
    if (onSearch) onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        className="w-full pr-10 border-4 border-purple-500 text-white font-tektur"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />

      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-gray-600"
          onClick={() => setValue("")}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
