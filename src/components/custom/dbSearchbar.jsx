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
        className="w-full pr-10 rounded-lg border border-gray-300 px-4 py-2 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />

      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          onClick={() => setValue("")}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
