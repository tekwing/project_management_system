
type TimelineProps = {
    data: any;
    updateProjectData: (data:any) => void;
};

function ResourcesStep({data,updateProjectData}: TimelineProps){
    return(
        <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full">
            {/* Header Section */}
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Budget & Resources</h1>
                <p className="text-sm text-slate-500 mt-1">Specify financial allocations and link essential code environments.</p>
            </div>

            {/* Form Grid - Switched to a balanced 2x2 grid layout on desktop to fit the new field cleanly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                {/* Budget Field */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="project-budget" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Project Budget
                </label>
                <div className="relative w-full">
                    {/* Currency Icon */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-sm font-medium text-slate-400">$</span>
                    </div>
                    <input
                    id="project-budget"
                    type="number"
                    className="w-full h-10 pl-7 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="0.00"
                    value={data.budget || ""}
                    onChange={(e) => updateProjectData({ budget: e.target.value })}
                    />
                </div>
                </div>

                {/* Repository URL */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="repo-url" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Repository URL
                </label>
                <input
                    id="repo-url"
                    type="url"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="https://github.com"
                    value={data.repositoryUrl || ""} // 💡 Changed from repository_url to repositoryUrl to match your Review Screen!
                    onChange={(e) => updateProjectData({ repositoryUrl: e.target.value })}
                />
                </div>

                {/* Documentation URL (Added missing field) */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="documentation-url" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Documentation URL
                </label>
                <input
                    id="documentation-url"
                    type="url"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="https://notion.so"
                    value={data.documentationUrl || ""} // 💡 Ties perfectly to data.documentationUrl on the final Review page!
                    onChange={(e) => updateProjectData({ documentationUrl: e.target.value })}
                />
                </div>

                {/* Attachments (File Upload Area) */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="attachments" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Attachments
                </label>
                <div className="relative w-full">
                    <label
                    htmlFor="attachments"
                    className="flex items-center gap-2 w-full h-10 px-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-100 hover:border-indigo-500 transition cursor-pointer"
                    >
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0A3 3 0 1011.243 13.414l3.536-3.536m0 0l-3.536 3.536m1.414-1.414l-3.536 3.536M6.343 17.657l3.536-3.536m0 0a3 3 0 104.243-4.243l-3.536 3.536" />
                    </svg>
                    <span className="truncate">{data.attachments ? String(data.attachments) : "Upload project brief..."}</span>
                    </label>
                    <input
                    id="attachments"
                    type="file"
                    className="hidden"
                    onChange={(e) => updateProjectData({ attachments: e.target.files?.[0]?.name || "" })}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default ResourcesStep