import { Table, LayoutGrid, Plus } from "lucide-react"
import { useState } from "react"

function Projects() {
    const[cardGridEnabled, setCardGrid] = useState<boolean>(false);
    return (
        <>
            <div className="w-full max-w-full">
                {/* Top Bar Wrap: Added overflow-x-auto to prevent button squeezing on mobile */}
                <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center mb-5">
                    
                    {/* Left Side: Buttons Group */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Add Project Button - Simplified alignment with flex items-center */}
                        <button className="inline-flex items-center gap-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            <Plus size={20} /> 
                            <span>Add Project</span>
                        </button>
                        
                        {/* Filter Badges - Wrapped in a sub-flex group with overflow capabilities */}
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-green-600 text-white rounded-full py-1 px-4 text-xs font-medium hover:bg-green-700 transition-colors">Recently Opened</button>
                            <button className="bg-green-600 text-white rounded-full py-1 px-4 text-xs font-medium hover:bg-green-700 transition-colors">Running</button>
                            <button className="bg-green-600 text-white rounded-full py-1 px-4 text-xs font-medium hover:bg-green-700 transition-colors">Done</button>
                            <button className="bg-green-600 text-white rounded-full py-1 px-4 text-xs font-medium hover:bg-green-700 transition-colors">Cancelled</button>
                        </div>
                    </div>
                    
                    {/* Right Side: View Toggles */}
                    <div className="flex items-center gap-3 text-gray-500 self-end md:self-auto">
                        <button className={`p-2 rounded transition-colors ${
                            !cardGridEnabled
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-500 hover:bg-gray-100"
                            }`} title="Table View" onClick={()=>setCardGrid(false)}>
                            <Table size={20} />
                        </button>
                        <button className={`p-2 rounded transition-colors ${
                            cardGridEnabled
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-500 hover:bg-gray-100"
                            }`} title="Grid View" onClick={()=>setCardGrid(true)}>
                            <LayoutGrid size={20} />
                        </button>
                    </div>
                </div>

                {/* Table Container Section */}
                {!cardGridEnabled &&(
                    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 mt-4">
                        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                <tr>
                                    <th className="px-6 py-3 min-w-50">Name of Project</th>
                                    <th className="px-6 py-3">Tasks</th>
                                    <th className="px-6 py-3">Comments</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 min-w-37.5">Collaborators</th>
                                    <th className="px-6 py-3">Last Opened</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">Quantum Leap Tech Core</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">1/4</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">9</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Doing</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">Ajay, Akash</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">Last Month</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-900 font-medium">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Card Container Section */}
                {cardGridEnabled &&(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className=" bg-gray-200">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                                <p className="text-gray-600 mb-4">
                                    This is a simple card built with Tailwind CSS.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Read More
                                </button>
                            </div>
                        </div>
                        <div className=" bg-gray-200">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                                <p className="text-gray-600 mb-4">
                                    This is a simple card built with Tailwind CSS.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Read More
                                </button>
                            </div>
                        </div>
                        <div className=" bg-gray-200">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                                <p className="text-gray-600 mb-4">
                                    This is a simple card built with Tailwind CSS.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Read More
                                </button>
                            </div>
                        </div>
                        <div className=" bg-gray-200">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                                <p className="text-gray-600 mb-4">
                                    This is a simple card built with Tailwind CSS.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Projects
