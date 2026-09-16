import { useState } from "react";

interface TimelineStepProps {
  data: Record<string, any>;
  updateProjectData: (data: Record<string, any>) => void;
}

function TimelineStep({ data, updateProjectData }: TimelineStepProps) {
  const [milestoneInput, setMilestoneInput] = useState("");

  // Safely extract milestones array with a fallback array
  const currentMilestones: string[] = data.milestones || [];

  const addMilestone = () => {
    if (!milestoneInput.trim()) return;
    
    updateProjectData({
      milestones: [...currentMilestones, milestoneInput.trim()]
    });
    setMilestoneInput("");
  };

  const removeMilestone = (indexToRemove: number) => {
    updateProjectData({
      milestones: currentMilestones.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full space-y-6">
      {/* Header Section */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Timeline</h1>
        <p className="text-sm text-slate-500 mt-1">Define key schedules, time zones, and major phase milestones.</p>
      </div>

      {/* Form Grid: Core Dates & Sizing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="start-date" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
            value={data.startDate || ""}
            onChange={(e) => updateProjectData({ startDate: e.target.value })}
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="due-date" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Due Date
          </label>
          <input
            id="due-date"
            type="date"
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
            value={data.dueDate || ""} // Changed to data.dueDate to perfectly match your final review screen!
            onChange={(e) => updateProjectData({ dueDate: e.target.value })}
          />
        </div>

        {/* Estimated Duration */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="estimated-duration" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Estimated Duration
          </label>
          <input
            id="estimated-duration"
            type="text"
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="e.g. 3 Months, 40 Hours"
            value={data.estimated_duration || ""}
            onChange={(e) => updateProjectData({ estimated_duration: e.target.value })}
          />
        </div>

        {/* Project Timezone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="timezone" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Timezone
          </label>
          <div className="relative w-full">
            <select
              id="timezone"
              className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
              value={data.timezone || ""}
              onChange={(e) => updateProjectData({ timezone: e.target.value })}
            >
                <option value="">Select Timezone</option>
                <option value="UTC">UTC / GMT (Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time - e.g. New York, Toronto)</option>
                <option value="PST">PST (Pacific Standard Time - e.g. Los Angeles, Vancouver)</option>
                <option value="CET">CET (Central European Time - e.g. Berlin, Paris)</option>
                <option value="IST">IST (Indian Standard Time - e.g. Mumbai, New Delhi)</option>
                <option value="AEST">AEST (Australian Eastern Time - e.g. Sydney, Melbourne)</option>

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 ADDED SECTION: DYNAMIC MILESTONE BUILDER */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <label htmlFor="milestone-input" className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
          Project Milestones
        </label>
        
        {/* Milestone Input row */}
        <div className="flex gap-3 max-w-xl">
          <input
            id="milestone-input"
            type="text"
            className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="e.g. Design Handoff, MVP Launch"
            value={milestoneInput}
            onChange={(e) => setMilestoneInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
          />
          <button
            type="button"
            onClick={addMilestone}
            className="h-10 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition shadow-xs cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Milestone Chips Container */}
        <div className="flex flex-wrap gap-2 pt-1">
          {currentMilestones.length === 0 ? (
            <span className="text-xs text-slate-400 italic">No milestones added yet. Press Enter or click Add.</span>
          ) : (
            currentMilestones.map((milestone, index) => (
              <span 
                key={index} 
                className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded-full shadow-2xs group transition hover:border-slate-300"
              >
                {milestone}
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-rose-600 transition cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TimelineStep;