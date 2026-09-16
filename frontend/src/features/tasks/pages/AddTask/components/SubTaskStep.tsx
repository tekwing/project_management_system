import { useState } from "react";
import { 
    Plus, 
    Trash2, 
    User, 
    Calendar, 
    ListChecks, 
    LayoutList
} from "lucide-react";
// Import your shared types from the parent component
import type { TaskFormData, SubTask } from "../AddTask"; 
import DropdownComponent from "../../../../../components/common/DropdownComponent";
import InputComponent from "../../../../../components/common/InputComponent";
import TextareaComponent from "../../../../../components/common/TextAreaComponent";

type Props = {
    formData: TaskFormData;
    setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
};

export default function SubTaskStep({ formData, setFormData }: Props) {
    // Local state just for the draft inputs before they are added
    const [draft, setDraft] = useState({
        title: "",
        description: "",
        assignee: "",
        due_date: "",
    });

    const addSubtask = () => {
        if (!draft.title.trim()) return;

        const newSubtask: SubTask = {
            id: Date.now(),
            title: draft.title.trim(),
            description: draft.description,
            assignee: draft.assignee,
            due_date: draft.due_date,
            status: "To Do",
        };

        // Save to parent state
        setFormData((prev) => ({
            ...prev,
            subtasks: [...(prev.subtasks || []), newSubtask]
        }));

        // Clear local draft
        setDraft({
            title: "",
            description: "",
            assignee: "",
            due_date: "",
        });
    };

    const removeSubtask = (id: number) => {
        setFormData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((task) => task.id !== id)
        }));
    };

    // Safely default to empty array if undefined
    const currentSubtasks = formData.subtasks || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <ListChecks size={20} className="text-indigo-500" />
                        Subtasks
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Break this task into smaller, manageable pieces of work.
                    </p>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {currentSubtasks.length} {currentSubtasks.length === 1 ? "Subtask" : "Subtasks"}
                </div>
            </div>

            {/* Add Subtask Form Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Add New Subtask</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <InputComponent
                            label="Subtask Title"
                            type="text"
                            placeholder="e.g., Design database schema"
                            value={draft.title}
                            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                            required = {false}
                        />
                    </div>

                    {/* Assignee */}
                    <div>
                        <DropdownComponent
                            label="Assignee"
                            required = {false}
                            placeholder="Select Assignee..."
                            value={draft.assignee}
                            onChange={(e) =>
                                setDraft({
                                    ...formData,
                                    assignee: e.target.value,
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

                    {/* Due Date */}
                    <div>
                        <InputComponent
                            label="Due Date"
                            placeholder=""
                            value={draft.due_date}
                            onChange={(e) => setDraft({ ...draft, due_date: e.target.value })}
                            type="date"
                            required= {false}
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextareaComponent 
                            label = "Description"
                            value = {draft.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ ...draft, description: e.target.value })}
                            placeholder = "Add any helpful details..."
                        />
                    </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={addSubtask}
                        disabled={!draft.title.trim()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-indigo-500"
                    >
                        <Plus size={16} /> Add Subtask
                    </button>
                </div>
            </div>

            {/* Subtask List */}
            {currentSubtasks.length > 0 ? (
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Added Subtasks</h4>
                    {currentSubtasks.map((item, index) => (
                        <div
                            key={item.id}
                            className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-indigo-300 transition-colors flex items-start gap-4"
                        >
                            {/* Number Badge */}
                            <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <div className="grow">
                                <h5 className="font-semibold text-gray-900 text-base">{item.title}</h5>
                                {item.description && (
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {item.description}
                                    </p>
                                )}
                                
                                {/* Meta Badges */}
                                <div className="flex flex-wrap gap-3 mt-3">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> To Do
                                    </span>
                                    {item.assignee && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                            <User size={13} className="text-gray-400" /> {item.assignee}
                                        </span>
                                    )}
                                    {item.due_date && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                            <Calendar size={13} className="text-gray-400" /> {item.due_date}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <button
                                type="button"
                                onClick={() => removeSubtask(item.id)}
                                className="shrink-0 p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Remove Subtask"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50/50 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                        <LayoutList size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-900 font-medium">No subtasks added yet</p>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">
                        Subtasks are optional. You can use them to break down complex tasks into smaller assignments.
                    </p>
                </div>
            )}
        </div>
    );
}