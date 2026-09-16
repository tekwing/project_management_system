function ProjectInfoStep({ data, updateProjectData }:{data: Record<string,any>; updateProjectData:(data:Record<string, any>)=>void}) {

    return (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-full mx-auto">
            {/* Header Section */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Project Information</h1>
                <p className="text-sm text-gray-500 mt-1">Please enter the core details of your project.</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Project Name */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="project-name" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Project Name
                </label>
                <input
                    id="project-name"
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    type="text"
                    value={data.name}
                    placeholder="Enter project name"
                    onChange={(e) => updateProjectData({ name: e.target.value })}
                />
                </div>

                {/* Project Code */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="project-code" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Project Code
                </label>
                <input
                    id="project-code"
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    type="text"
                    value={data.project_code}
                    placeholder="Enter project code"
                    onChange={(e) => updateProjectData({ project_code: e.target.value })} 
                />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="project-type" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Project Type
                </label>
                <select
                    id="project-type"
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
                    value={data.project_type}
                    onChange={(e) => updateProjectData({ project_type: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="maintenance">Maintenance</option>
                </select>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                </label>
                <select
                    id="category"
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
                    value={data.category}
                    onChange={(e) => updateProjectData({ category: e.target.value })}
                >
                    <option value="">Select category</option>
                    <option value="it">IT & Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                </select>
                </div>

                {/* Description (Spans full width on larger screens for better UX) */}
                <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3">
                <label htmlFor="description" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Describe your project..."
                    value={data.description}
                    onChange={(e) => updateProjectData({ description: e.target.value })}
                />
                </div>
            </div>
        </div>
    )
}


export default ProjectInfoStep;