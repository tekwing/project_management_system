type SettingsStepProps = {
    data: any;
    updateProjectData: (data: any) => void;
};

function SettingsStep({ data, updateProjectData }: SettingsStepProps) {
    return (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full">
            {/* Header Section */}
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Configure workspace visibility, defaults, and optional feature integrations.</p>
            </div>

            {/* Top Section: Dropdowns & Color Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-6 border-b border-slate-100">
                {/* Visibility */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="visibility" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Visibility
                    </label>
                    <div className="relative w-full">
                        <select
                            id="visibility"
                            className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
                            value={data.visibility || ""}
                            onChange={(e) => updateProjectData({ visibility: e.target.value })}
                        >
                            <option value="">Select Visibility</option>
                            <option value="private">Private</option>
                            <option value="team_only">Team Only</option>
                            <option value="public">Public</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Priority */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="priority" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Priority
                    </label>
                    <div className="relative w-full">
                        <select
                            id="priority"
                            className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
                            value={data.priority || ""}
                            onChange={(e) => updateProjectData({ priority: e.target.value })}
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Default Status */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="default-status" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Default Status
                    </label>
                    <div className="relative w-full">
                        <select
                            id="default-status"
                            className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-transparent cursor-pointer transition"
                            value={data.defaultStatus || "todo"}
                            onChange={(e) => updateProjectData({ defaultStatus: e.target.value })}
                        >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Project Color */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="project-color" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Project Theme Color
                    </label>
                    <div className="flex items-center gap-3 w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <input
                            id="project-color"
                            type="color"
                            className="h-6 w-8 rounded cursor-pointer border border-slate-300 bg-transparent shrink-0 appearance-none"
                            value={data.projectColor || "#3B82F6"}
                            onChange={(e) => updateProjectData({ projectColor: e.target.value })}
                        />
                        <span className="text-sm font-mono text-slate-600 uppercase">
                            {data.projectColor || "#3B82F6"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Feature Toggles */}
            <div className="mt-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Features & Permissions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notifications */}
                    <label className="relative flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer transition select-none">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-800">Enable Notifications</span>
                            <span className="text-xs text-slate-400">Get updates on team activity and tasks</span>
                        </div>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!data.enableNotifications}
                            onChange={(e) => updateProjectData({ enableNotifications: e.target.checked })}
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                    </label>

                    {/* Time Tracking (Restored & Completed) */}
                    {/* Time Tracking */}
                    <label className="relative flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer transition select-none">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-800">Enable Time Tracking</span>
                            <span className="text-xs text-slate-400">Log working metrics directly onto items</span>
                        </div>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!data.enableTimeTracking}
                            onChange={(e) => updateProjectData({ enableTimeTracking: e.target.checked })}
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                    </label>

                    {/* Guest Access */}
                    <label className="relative flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer transition select-none">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-800">Allow Guest Members</span>
                            <span className="text-xs text-slate-400">Permit external vendors or viewing accounts</span>
                        </div>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!data.allowGuestMembers}
                            onChange={(e) => updateProjectData({ allowGuestMembers: e.target.checked })}
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                    </label>

                    {/* Auto Archive */}
                    <label className="relative flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer transition select-none">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-800">Auto Archive Tasks</span>
                            <span className="text-xs text-slate-400">Instantly clean finished workflow rows</span>
                        </div>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!data.autoArchiveCompletedTasks}
                            onChange={(e) => updateProjectData({ autoArchiveCompletedTasks: e.target.checked })}
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SettingsStep;