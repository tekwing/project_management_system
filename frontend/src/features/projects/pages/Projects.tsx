import { Plus, Table, LayoutGrid, Search } from 'lucide-react';
import { useState } from "react"
import { CheckSquare, MessageSquare, MoreVertical, Edit2 } from 'lucide-react';

function Projects() {
    const[cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const[searchQuery, setSearchQuery] = useState<string>('');
    return (
        <>
            <div className="w-full max-w-full">
                {/* Top Bar Wrap: Added overflow-x-auto to prevent button squeezing on mobile */}
                    {/* Main Toolbar Container */}
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    
                    {/* Left Side: Actions and Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Add Project Button */}
                        <button className="inline-flex justify-center items-center gap-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm">
                            <Plus size={18} /> 
                            <span>Add Project</span>
                        </button>
                        
                        {/* Filter Badges */}
                        {/* Using a subtle background with colored text for a cleaner look */}
                        <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full text-xs font-medium transition-colors">
                                Recently Opened
                            </button>
                            <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors">
                                Running
                            </button>
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-full text-xs font-medium transition-colors">
                                Done
                            </button>
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full text-xs font-medium transition-colors">
                                Cancelled
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Side: Search and View Toggles */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* View Toggles - Grouped as a segmented control */}
                        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto justify-center">
                            <button 
                                onClick={() => setCardGrid(false)}
                                title="Table View"
                                className={`p-1.5 rounded-md transition-all flex-1 sm:flex-none flex justify-center ${
                                    !cardGridEnabled
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                            >
                                <Table size={18} />
                            </button>
                            <button 
                                onClick={() => setCardGrid(true)}
                                title="Grid View"
                                className={`p-1.5 rounded-md transition-all flex-1 sm:flex-none flex justify-center ${
                                    cardGridEnabled
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Table Container Section */}
                {!cardGridEnabled && (
                    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mt-2">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-sm text-left">
                                <thead className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4">Project Name</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Progress</th>
                                        <th className="px-6 py-4">Collaborators</th>
                                        <th className="px-6 py-4">Last Opened</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {/* Example Row */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                            Quantum Leap Tech Core
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                Doing
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1.5" title="Tasks">
                                                    <CheckSquare size={14} className="text-gray-400" /> 1/4
                                                </span>
                                                <span className="flex items-center gap-1.5" title="Comments">
                                                    <MessageSquare size={14} className="text-gray-400" /> 9
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex -space-x-2 overflow-hidden">
                                                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white bg-indigo-100 text-[10px] font-medium text-indigo-700" title="Ajay">AJ</div>
                                                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white bg-emerald-100 text-[10px] font-medium text-emerald-700" title="Akash">AK</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-500">Last Month</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Card Container Section */}
                {cardGridEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                        {/* Example Card */}
                        <div className="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 p-5 cursor-pointer">
                            
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                    Quantum Leap Tech Core
                                </h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Doing
                                </span>
                            </div>
                            
                            {/* Card Stats (Tasks & Comments) */}
                            <div className="flex items-center gap-5 text-sm text-gray-500 mb-6 flex-grow">
                                <div className="flex items-center gap-1.5">
                                    <CheckSquare size={16} className="text-gray-400" /> 
                                    <span>1/4 Tasks</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare size={16} className="text-gray-400" /> 
                                    <span>9 Comments</span>
                                </div>
                            </div>

                            {/* Card Footer (Collaborators & Last Opened) */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex -space-x-2 overflow-hidden">
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-indigo-100 text-xs font-medium text-indigo-700" title="Ajay">AJ</div>
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-emerald-100 text-xs font-medium text-emerald-700" title="Akash">AK</div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">Opened Last Month</span>
                            </div>
                            
                        </div>
                        
                        {/* You would map() over your data here to generate more cards */}
                        
                    </div>
                )}
            </div>
        </>
    )
}

export default Projects
