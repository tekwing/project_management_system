
import { Users } from "lucide-react";
// Import your shared types from the parent component
import type { TaskFormData } from "../AddTask";
import DropdownComponent from "../../../../../components/common/DropdownComponent";
import InputWithBadge from "../../../../../components/common/InputWithBadgeComponent";

type Props = {
    formData: TaskFormData;
    setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
};

export default function TaskAssignmentStep({ formData, setFormData }: Props) {
    // Safely default to an empty array if undefined
    const currentLabels = formData.task_labels || [];
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    <Users size={18} className="text-indigo-500" />
                    Assignment & Workflow
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Assignee */}
                <div>
                    <DropdownComponent
                        label="Assignee"
                        required
                        placeholder="Select Assignee"
                        value={formData.task_assigned_to}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                task_assigned_to: e.target.value,
                            })
                        }
                        options={[
                            {
                                value: "project-1",
                                label: "John Doe",
                            },
                            {
                                value: "project-2",
                                label: "Sarah Wilson",
                            },
                            {
                                value: "project-3",
                                label: "Michael Smith",
                            },
                        ]}
                    />
                </div>

                {/* Reporter */}
                <div>
                    <DropdownComponent
                        label="Reporter"
                        placeholder="Select Reporter"
                        value={formData.task_reporter}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                task_reporter: e.target.value,
                            })
                        }
                        options={[
                            {
                                value: "project-1",
                                label: "John Doe",
                            },
                            {
                                value: "project-2",
                                label: "Sarah Wilson",
                            },
                            {
                                value: "project-3",
                                label: "Michael Smith",
                            },
                        ]}
                    />
                </div>

                {/* Status */}
                <div>
                    <DropdownComponent
                        label="Status"
                        placeholder="Select Status"
                        value={formData.task_status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                task_status: e.target.value,
                            })
                        }
                        options={[
                            {
                                value: "todo",
                                label: "To Do",
                            },
                            {
                                value: "In Progress",
                                label: "In Progress",
                            },
                            {
                                value: "In Review",
                                label: "In Review",
                            },
                            {
                                value: "Blocked",
                                label: "Blocked",
                            },
                            {
                                value: "Done",
                                label: "Done",
                            },
                        ]}
                    />
                </div>

                {/* Labels/Tags - Full Width */}
                <div className="lg:col-span-3">
                    <InputWithBadge
                        label="Task Labels"
                        currentLabels={currentLabels}
                        onAddLabel={(newLabel) =>
                            setFormData((prev) => ({
                            ...prev,
                            task_labels: [...(prev.task_labels || []), newLabel],
                            }))
                        }
                        onRemoveLabel={(labelToRemove) =>
                            setFormData((prev) => ({
                            ...prev,
                            task_labels: (prev.task_labels || []).filter(
                                (label) => label !== labelToRemove
                            ),
                            }))
                        }
                        />
                    <p className="text-xs text-gray-500 mt-1.5">
                        Use labels to categorize your task (e.g., "frontend", "urgent", "v2.0").
                    </p>
                </div>

            </div>
        </div>
    );
}