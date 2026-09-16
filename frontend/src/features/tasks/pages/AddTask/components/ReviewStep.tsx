import { 
    ClipboardCheck, 
    FileText, 
    Users, 
    ListChecks, 
    Calendar, 
    Tag, 
    User,
    CheckCircle2
} from "lucide-react";
// Import your shared types from the parent component
import type { TaskFormData } from "../AddTask";

type Props = {
    formData: TaskFormData;
    setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
};

export default function ReviewStep({ formData }: Props) {
    
    // Format date nicely (e.g., "Aug 15, 2026")
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Not set";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    // Helper for Priority badge colors
    const getPriorityStyle = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case "urgent": return "bg-rose-100 text-rose-700 ring-rose-600/20";
            case "high": return "bg-orange-100 text-orange-700 ring-orange-600/20";
            case "medium": return "bg-amber-100 text-amber-700 ring-amber-600/20";
            case "low": return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
            default: return "bg-gray-100 text-gray-700 ring-gray-500/20";
        }
    };

    // Helper for Status badge colors
    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "done": return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
            case "in_progress": return "bg-blue-100 text-blue-700 ring-blue-600/20";
            case "in_review": return "bg-purple-100 text-purple-700 ring-purple-600/20";
            case "blocked": return "bg-rose-100 text-rose-700 ring-rose-600/20";
            default: return "bg-gray-100 text-gray-700 ring-gray-500/20";
        }
    };

    const currentSubtasks = formData.subtasks || [];
    const currentLabels = formData.task_labels || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header */}
            <div className="pb-4 border-b border-gray-100">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <ClipboardCheck size={20} className="text-indigo-500" />
                    Review Task Details
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Please verify the information below before finalizing the task.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Core Info & Assignment */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Info Block */}
                    <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-5">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200/60">
                            <FileText size={16} className="text-gray-500" /> Task Information
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                            <div className="col-span-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Title</p>
                                <p className="text-gray-900 font-medium">{formData.title || "—"}</p>
                            </div>
                            
                            <div className="col-span-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</p>
                                <p className="text-gray-700 text-sm whitespace-pre-wrap">{formData.description || "No description provided."}</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Project</p>
                                <p className="text-gray-900 font-medium">{formData.project || "—"}</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Type</p>
                                <p className="text-gray-900 font-medium capitalize">{formData.type || "—"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subtasks Block */}
                    <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/60">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                                <ListChecks size={16} className="text-gray-500" /> Subtasks
                            </h4>
                            <span className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                {currentSubtasks.length}
                            </span>
                        </div>

                        {currentSubtasks.length > 0 ? (
                            <div className="space-y-3">
                                {currentSubtasks.map((subtask, index) => (
                                    <div key={subtask.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex items-start gap-3">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{subtask.title}</p>
                                            <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                                                {subtask.assignee && (
                                                    <span className="flex items-center gap-1"><User size={12}/> {subtask.assignee}</span>
                                                )}
                                                {subtask.due_date && (
                                                    <span className="flex items-center gap-1"><Calendar size={12}/> {formatDate(subtask.due_date)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No subtasks added.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Meta, Dates, Assignment */}
                <div className="space-y-6">
                    
                    {/* Meta Card */}
                    <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-5">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200/60">
                            <Users size={16} className="text-gray-500" /> Details & Assignment
                        </h4>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Priority & Status</p>
                                <div className="flex gap-2">
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-inset capitalize ${getPriorityStyle(formData.priority)}`}>
                                        {formData.priority || "No Priority"}
                                    </span>
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-inset capitalize ${getStatusStyle(formData.task_status)}`}>
                                        {formData.task_status?.replace('_', ' ') || "To Do"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Timeline</p>
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar size={14} className="text-gray-400"/>
                                        <span className="w-12 text-gray-500">Start:</span> 
                                        <span className="font-medium">{formatDate(formData.start_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar size={14} className="text-gray-400"/>
                                        <span className="w-12 text-gray-500">Due:</span> 
                                        <span className="font-medium text-indigo-600">{formatDate(formData.due_date)}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">People</p>
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <User size={14} className="text-gray-400"/>
                                        <span className="w-16 text-gray-500">Assignee:</span> 
                                        <span className="font-medium">{formData.task_assigned_to || "Unassigned"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <User size={14} className="text-gray-400"/>
                                        <span className="w-16 text-gray-500">Reporter:</span> 
                                        <span className="font-medium">{formData.task_reporter || "—"}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Labels</p>
                                <div className="flex flex-wrap gap-2">
                                    {currentLabels.length > 0 ? (
                                        currentLabels.map((label) => (
                                            <span key={label} className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                                                <Tag size={10} /> {label}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">No labels</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Notice */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 shadow-sm">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h5 className="text-sm font-semibold text-emerald-800">Ready to Create</h5>
                            <p className="text-xs text-emerald-600 mt-1">
                                Everything looks good. Click <strong>Save Task</strong> below to add this task to the project workspace.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}