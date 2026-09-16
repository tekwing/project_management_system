import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Save, X } from "lucide-react";

// Assuming these components exist in your folder
import TaskInfoStep from "./components/TaskInfoStep";
import TaskAssignmentStep from "./components/AssignmentStep";
import SubTaskStep from "./components/SubTaskStep";
import ReviewStep from "./components/ReviewStep";

export type TaskFormData = {
    title: string;
    description: string;
    project: string;
    priority: string;
    due_date: string;
    subtasks: SubTask[];
    task_assigned_to: string;
    task_reporter: string;
    task_status: string;
    task_labels: string[];
    type: string,
    start_date:any,
};

export type SubTask = {
    id: number;
    title: string;
    description: string;
    assignee: string;
    due_date: string;
    status: string;
};

const STEPS = [
    { id: 1, name: "Task Details" },
    { id: 2, name: "Assignment" },
    { id: 3, name: "Sub-Tasks" },
    { id: 4, name: "Review & Save" }
];

export default function AddTask() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        project: "",
        priority: "",
        due_date: "",
        subtasks: [],
        task_assigned_to: "",
        task_reporter: "",
        task_status: "",
        task_labels: [],
        type:"",
        start_date:"",
    });

    const handleSubmit = () => {
        // Renamed from memberData to taskData for clarity
        const taskData = { ...formData };
        console.log("Saving Task:", taskData);
        // Add your API call here
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const previousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
            
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
                <p className="text-sm text-gray-500 mt-1">Fill out the details below to add a new task to the workflow.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-150">
                
                {/* Stepper Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between relative">
                        {/* Connecting Line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                        
                        {STEPS.map((step) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            
                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10 bg-gray-50 px-2 text-center w-24">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-200 mb-2 ring-4 ring-white ${
                                        isCompleted ? "bg-emerald-500 text-white" :
                                        isActive ? "bg-indigo-600 text-white" :
                                        "bg-gray-200 text-gray-500"
                                    }`}>
                                        {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                                    </div>
                                    <span className={`text-xs font-medium transition-colors ${
                                        isActive ? "text-indigo-600" : 
                                        isCompleted ? "text-emerald-600" : 
                                        "text-gray-400"
                                    }`}>
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Form Content Area */}
                <div className="p-6 grow w-full">
                    {/* Note: You MUST pass formData and setFormData to your child components! */}
                    {currentStep === 1 && <TaskInfoStep formData={formData} setFormData={setFormData} />}
                    {currentStep === 2 && <TaskAssignmentStep formData={formData} setFormData={setFormData} />}
                    {currentStep === 3 && <SubTaskStep formData={formData} setFormData={setFormData} />}
                    {currentStep === 4 && <ReviewStep formData={formData} setFormData={setFormData} />}
                </div>
                
                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between mt-auto">
                    
                    {/* Left: Cancel Button (Always visible) */}
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-200">
                        <X size={16} /> Cancel
                    </button>

                    {/* Right: Navigation / Submit */}
                    <div className="flex items-center gap-3">
                        {currentStep > 1 && (
                            <button 
                                onClick={previousStep} 
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-200"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                        )}
                        
                        {currentStep < 4 ? (
                            <button 
                                onClick={nextStep} 
                                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            >
                                Continue <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 shadow-sm"
                            >
                                <Save size={16} /> Save Task
                            </button>
                        )}
                    </div>
                </div>

            </div>

            {/* Debugging JSON Viewer (Optional, good for dev mode) */}
            <div className="mt-8 bg-gray-900 rounded-xl p-4 shadow-inner">
                <h3 className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider border-b border-gray-700 pb-2">Debug: Form State Data</h3>
                <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>

        </div>
    );
}