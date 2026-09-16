import { 
    AlignLeft, 
    CalendarDays, 
    FolderKanban 
} from "lucide-react";
// Import your shared type from the parent component
import type { TaskFormData } from "../AddTask"; 
import InputComponent from "../../../../../components/common/InputComponent";
import DropdownComponent from "../../../../../components/common/DropdownComponent";
import TextareaComponent from "../../../../../components/common/TextAreaComponent";

type Props = {
    formData: TaskFormData;
    setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
};

export default function TaskInfoStep({ formData, setFormData }: Props) {

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Section 1: Basic Details */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    <FolderKanban size={18} className="text-indigo-500" /> 
                    Basic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-3">
                        <InputComponent
                            label="Task Title"
                            placeholder="e.g., Implement OAuth2 Authentication"
                            value={formData.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required= {true}
                        />
                    </div>

                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Project"
                            required
                            placeholder="Select Project"
                            value={formData.project}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    project: e.target.value,
                                })
                            }
                            options={[
                                {
                                    value: "project-1",
                                    label: "Website Redesign",
                                },
                                {
                                    value: "project-2",
                                    label: "Mobile App",
                                },
                                {
                                    value: "project-3",
                                    label: "Marketing Campaign",
                                },
                            ]}
                        />
                    </div>

                    {/* Note: Ensure 'type' exists on your TaskFormData type in the parent */}
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Task Type"
                            placeholder="Select Type"
                            value={formData.type || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    type: e.target.value,
                                })
                            }
                            options={[
                                {
                                    value: "task",
                                    label: "Task",
                                },
                                {
                                    value: "bug",
                                    label: "Bug",
                                },
                                {
                                    value: "feature",
                                    label: "Feature",
                                },
                                {
                                    value: "improvement",
                                    label: "Improvement",
                                },
                            ]}
                        />
                    </div>

                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Priority"
                            required
                            placeholder="Select Priority"
                            value={formData.priority}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    priority: e.target.value,
                                })
                            }
                            options={[
                                {
                                    value: "low",
                                    label: "Low",
                                },
                                {
                                    value: "medium",
                                    label: "Medium",
                                },
                                {
                                    value: "high",
                                    label: "High",
                                },
                                {
                                    value: "urgent",
                                    label: "Urgent",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Section 2: Timeline */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    <CalendarDays size={18} className="text-indigo-500" /> 
                    Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Note: Ensure 'start_date' exists on your TaskFormData type in the parent */}
                    <div className="flex flex-col">
                        <InputComponent
                            label="Start Date"
                            type="date" // Added date type for native calendar picker
                            placeholder=""
                            value={formData.start_date || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, start_date: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponent
                            label="Due Date"
                            type="date" // Added date type for native calendar picker
                            placeholder=""
                            value={formData.due_date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, due_date: e.target.value })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Description */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    <AlignLeft size={18} className="text-indigo-500" /> 
                    Additional Context
                </h3>
                <div className="flex flex-col">
                    <TextareaComponent 
                        label = "Description"
                        value = {formData.description}
                        onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                        placeholder = "Describe the task requirements, context, and expected outcomes..."
                    />
                </div>
            </div>

        </div>
    );
}