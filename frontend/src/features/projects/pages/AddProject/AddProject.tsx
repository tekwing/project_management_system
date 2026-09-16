import React, { useState, useEffect } from "react";
import StepIndicator from "./components/StepIndicator";
import ProjectInfoStep from "./components/ProjectInfoStep";
import TeamStep from "./components/TeamStep";
import TimeLineStep from "./components/TimeLineStep";
import ResourcesStep from "./components/ResourcesStep";
import SettingsStep from "./components/SettingsStep";
import ReviewStep from "./components/ReviewStep";
import { useOutletContext } from "react-router-dom";

type LayoutContext = {
    parentDivRef: React.RefObject<HTMLElement | null>;
};
// Define strict typing architecture for state safety
interface Member {
  name: string;
  role: string;
}

interface ProjectDataState {
  name: string;
  project_type: string;
  project_code: string;
  description: string;
  category: string;
  projectManager: string; // 👑 Added for Leadership mapping
  projectLead: string;    // 👑 Added for Leadership mapping
  members: Member[];
  startDate: string;
  dueDate: string;        // 💡 Normalized to camelCase to sync with Timeline/Review steps
  estimated_duration: string;
  timezone: string;       // 🌍 Added for global time anchor synchronization
  milestones: string[];   // 🚀 Added for strategic roadmap tracking arrays
  budget: string;
  repositoryUrl: string;  // 💡 Normalized to camelCase to sync with Resources/Review steps
  documentationUrl: string; // 📄 Added missing link field
  attachments: string;
  visibility: string;
  priority: string;
  defaultStatus: string;
  projectColor: string;
  enableNotifications: boolean;
  enableTimeTracking: boolean;
  allowGuestMembers: boolean;
  autoArchiveCompletedTasks: boolean;
}

function AddProject() {
  const { parentDivRef } = useOutletContext<LayoutContext>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [projectData, setProjectData] = useState<ProjectDataState>({
    name: "",
    project_type: "",
    project_code: "",
    description: "",
    category: "",
    projectManager: "",
    projectLead: "",
    members: [],
    startDate: "",
    dueDate: "",
    estimated_duration: "",
    timezone: "",
    milestones: [],
    budget: "",
    repositoryUrl: "",
    documentationUrl: "",
    attachments: "",
    visibility: "private",
    priority: "medium",
    defaultStatus: "todo",
    projectColor: "#3B82F6",
    enableNotifications: true,
    enableTimeTracking: false,
    allowGuestMembers: false,
    autoArchiveCompletedTasks: false,
  });

  const updateProjectData = (newData: Partial<ProjectDataState>) => {
    setProjectData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
      parentDivRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  }, [currentStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 6) return;
    
    // ========================================================
    // 🚀 PLACE YOUR SERVER / API BACKEND SUBMIT CALL HERE
    // ========================================================
    console.log("Launching project environment payload: ", projectData);
    alert("Project configurations saved! Launching workspace environment...");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Dynamic Header Progress Tracker */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Panels Context Engine */}
      <div className="min-h-100">
        {currentStep === 1 && (
          <ProjectInfoStep data={projectData} updateProjectData={updateProjectData} />
        )}
        {currentStep === 2 && (
          <TeamStep data={projectData} updateProjectData={updateProjectData} />
        )}
        {currentStep === 3 && (
          <TimeLineStep data={projectData} updateProjectData={updateProjectData} />
        )}
        {currentStep === 4 && (
          <ResourcesStep data={projectData} updateProjectData={updateProjectData} />
        )}
        {currentStep === 5 && (
          <SettingsStep data={projectData} updateProjectData={updateProjectData} />
        )}
        {currentStep === 6 && (
          <ReviewStep data={projectData} />
        )}
      </div>
      
      {/* Wizard Footer Interactive Control Navigation Bar */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
        {/* Previous Button Container */}
        <div>
          {currentStep > 1 && (
            <button
              onClick={previousStep}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Previous
            </button>
          )}
        </div>

        {/* Next / Submit Button Container */}
        <div>
          {currentStep < 6 && (
            <button
              onClick={nextStep}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 active:bg-indigo-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          )}

          {currentStep === 6 && (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700 active:bg-emerald-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              Submit Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
          )}
        </div>
      </div>  

      {/* JSON Output Debugger (Optional: Remove when pushed to production) */}
      <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
        <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2">Live State Payload Debugger</h4>
        <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {JSON.stringify(projectData, null, 2)}
        </pre>
      </div>
    </form>
  );
}

export default AddProject;