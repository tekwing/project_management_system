import React, { useState } from "react";
import { Tag, X } from "lucide-react";

type InputWithBadgeProps = {
  label: string;
  currentLabels: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
  placeholder?: string;
};

export function InputWithBadge({
  label,
  currentLabels,
  onAddLabel,
  onRemoveLabel,
  placeholder = "Type a label and press Enter...",
}: InputWithBadgeProps) {
  const [labelInput, setLabelInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && labelInput.trim() !== "") {
        if (currentLabels.includes(label)) {
            setLabelInput("");
            return;
        }
        e.preventDefault();
        onAddLabel(labelInput.trim());
        setLabelInput("");
    }
  };

  return (
    <>
      <label className="mb-1.5 text-sm font-medium text-gray-700 flex items-center gap-1.5">
        <Tag size={14} className="text-gray-500" /> {label}
      </label>

      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg min-h-10.5 px-2 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all flex flex-wrap items-center gap-2">
        {currentLabels.map((lbl) => (
          <span
            key={lbl}
            className="flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-sm font-medium animate-in zoom-in duration-200"
          >
            {lbl}
            <button
              type="button"
              onClick={() => onRemoveLabel(lbl)}
              className="text-indigo-500 hover:text-indigo-800 hover:bg-indigo-200 rounded-full p-0.5 transition-colors focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={labelInput}
          placeholder={
            currentLabels.length === 0 ? placeholder : "Add another..."
          }
          onChange={(e) => setLabelInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 min-w-37.5 text-sm text-gray-900 placeholder:text-gray-400 px-1 py-1"
        />
      </div>
    </>
  );
}

export default InputWithBadge;
