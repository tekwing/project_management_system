import { useState } from "react";
import { 
    Table as TableIcon, 
    LayoutGrid, 
    Plus, 
    Search, 
    MoreVertical, 
    Edit2, 
    CheckSquare, 
    MessageSquare,
    Clock,
    AlertCircle
} from "lucide-react";

// Dummy data so both views render the exact same information seamlessly
const mockTasks = [
    {
        id: "TSK-001",
        title: "Implement OAuth2 Authentication",
        project: "Quantum Leap Tech Core",
        priority: "Urgent",
        status: "In Progress",
        dueDate: "Oct 24, 2026",
        subtasks: { completed: 3, total: 4 },
        comments: 9,
        assignees: [
            { name: "Ajay", initials: "AJ", color: "bg-indigo-100 text-indigo-700" },
            { name: "Akash", initials: "AK", color: "bg-emerald-100 text-emerald-700" }
        ]
    },
    {
        id: "TSK-002",
        title: "Redesign User Dashboard",
        project: "Website Revamp",
        priority: "High",
        status: "To Do",
        dueDate: "Oct 28, 2026",
        subtasks: { completed: 0, total: 5 },
        comments: 2,
        assignees: [
            { name: "Sarah", initials: "SW", color: "bg-rose-100 text-rose-700" }
        ]
    },
    {
        id: "TSK-003",
        title: "Database Migration Scripts",
        project: "Backend Scaling",
        priority: "Medium",
        status: "In Review",
        dueDate: "Nov 02, 2026",
        subtasks: { completed: 8, total: 8 },
        comments: 14,
        assignees: [
            { name: "Michael", initials: "MS", color: "bg-amber-100 text-amber-700" },
            { name: "John", initials: "JD", color: "bg-cyan-100 text-cyan-700" }
        ]
    },
    {
        id: "TSK-004",
        title: "Update Privacy Policy Terms",
        project: "Legal & Compliance",
        priority: "Low",
        status: "Done",
        dueDate: "Oct 15, 2026",
        subtasks: { completed: 2, total: 2 },
        comments: 1,
        assignees: [
            { name: "Emily", initials: "ED", color: "bg-purple-100 text-purple-700" }
        ]
    }
];

export default function Tasks() {
    const [cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Helper for Status badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Done": return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
            case "In Progress": return "bg-blue-50 text-blue-700 ring-blue-600/20";
            case "In Review": return "bg-purple-50 text-purple-700 ring-purple-600/20";
            default: return "bg-gray-100 text-gray-700 ring-gray-500/20"; // To Do
        }
    };

    // Helper for Priority colors/icons
    const getPriorityDisplay = (priority: string) => {
        switch (priority) {
            case "Urgent": return { color: "text-rose-600", bg: "bg-rose-100" };
            case "High": return { color: "text-orange-600", bg: "bg-orange-100" };
            case "Medium": return { color: "text-amber-600", bg: "bg-amber-100" };
            default: return { color: "text-emerald-600", bg: "bg-emerald-100" }; // Low
        }
    };

    return (
        <div className="w-full max-w-full">
            
            {/* Toolbar Section */}
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                
                {/* Left Side: Actions and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button className="inline-flex justify-center items-center gap-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm">
                        <Plus size={18} /> 
                        <span>Add Task</span>
                    </button>
                    
                    {/* Filter Badges */}
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors">
                            All Tasks
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-full text-xs font-medium transition-colors">
                            In Progress
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-full text-xs font-medium transition-colors">
                            In Review
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-xs font-medium transition-colors">
                            Done
                        </button>
                    </div>
                </div>
                
                {/* Right Side: Search and View Toggles */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search tasks..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto justify-center">
                        <button 
                            onClick={() => setCardGrid(false)}
                            title="Table View"
                            className={`p-1.5 rounded-md transition-all flex-1 sm:flex-none flex justify-center ${
                                !cardGridEnabled ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            }`}
                        >
                            <TableIcon size={18} />
                        </button>
                        <button 
                            onClick={() => setCardGrid(true)}
                            title="Grid View"
                            className={`p-1.5 rounded-md transition-all flex-1 sm:flex-none flex justify-center ${
                                cardGridEnabled ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            }`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table View */}
            {!cardGridEnabled && (
                <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">Task Details</th>
                                    <th className="px-6 py-4">Status & Priority</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Assignees</th>
                                    <th className="px-6 py-4">Due Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {mockTasks.map((task) => {
                                    const priorityStyle = getPriorityDisplay(task.priority);
                                    
                                    return (
                                        <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900">{task.title}</span>
                                                    <span className="text-xs text-gray-500 mt-0.5">{task.id} • {task.project}</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex flex-col items-start gap-2">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadge(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                    <span className={`flex items-center gap-1 text-xs font-medium ${priorityStyle.color}`}>
                                                        <AlertCircle size={12} /> {task.priority}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5" title="Subtasks">
                                                        <CheckSquare size={14} className="text-gray-400" /> 
                                                        {task.subtasks.completed}/{task.subtasks.total}
                                                    </span>
                                                    <span className="flex items-center gap-1.5" title="Comments">
                                                        <MessageSquare size={14} className="text-gray-400" /> 
                                                        {task.comments}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    {task.assignees.map((assignee, idx) => (
                                                        <div key={idx} className={`inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white text-xs font-bold ${assignee.color}`} title={assignee.name}>
                                                            {assignee.initials}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-600">
                                                    <Clock size={14} className="text-gray-400"/>
                                                    <span className={task.status !== 'Done' && new Date(task.dueDate) < new Date() ? 'text-rose-600 font-medium' : ''}>
                                                        {task.dueDate}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors ml-1">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Grid / Card View (Kanban style) */}
            {cardGridEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {mockTasks.map((task) => {
                        const priorityStyle = getPriorityDisplay(task.priority);
                        
                        return (
                            <div key={task.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 p-5 flex flex-col cursor-pointer">
                                
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider line-clamp-1 pr-2">
                                        {task.project}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600 -mr-1">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                {/* Title & ID */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                                        {task.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1.5">{task.id}</p>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${getStatusBadge(task.status)}`}>
                                        {task.status}
                                    </span>
                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${priorityStyle.bg} ${priorityStyle.color}`}>
                                        <AlertCircle size={10} /> {task.priority}
                                    </span>
                                </div>

                                {/* Card Footer: Stats & Assignees */}
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    
                                    {/* Stats Group */}
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <div className="flex items-center gap-1 text-xs font-medium" title="Subtasks">
                                            <CheckSquare size={14} className="text-gray-400" />
                                            <span>{task.subtasks.completed}/{task.subtasks.total}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-medium" title="Comments">
                                            <MessageSquare size={14} className="text-gray-400" />
                                            <span>{task.comments}</span>
                                        </div>
                                    </div>

                                    {/* Assignees Avatars */}
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {task.assignees.map((assignee, idx) => (
                                            <div key={idx} className={`inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white text-[10px] font-bold ${assignee.color}`} title={assignee.name}>
                                                {assignee.initials}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}