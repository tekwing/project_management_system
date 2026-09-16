import { useState } from "react";
import { 
    Table as TableIcon, 
    LayoutGrid, 
    Plus, 
    Search, 
    MoreVertical, 
    Edit2, 
    Mail, 
    Phone 
} from "lucide-react";

// Dummy data so both views render the exact same information seamlessly
const mockMembers = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Senior Developer",
        department: "Engineering",
        email: "alex.j@example.com",
        phone: "+1 (555) 123-4567",
        status: "Active",
        avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=e0e7ff&color=4f46e5",
    },
    {
        id: 2,
        name: "Sarah Smith",
        role: "UI/UX Designer",
        department: "Design",
        email: "sarah.s@example.com",
        phone: "+1 (555) 987-6543",
        status: "Active",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=dcfce3&color=166534",
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Project Manager",
        department: "Management",
        email: "michael.b@example.com",
        phone: "+1 (555) 456-7890",
        status: "On Leave",
        avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=fef3c7&color=92400e",
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "QA Engineer",
        department: "Quality Assurance",
        email: "emily.d@example.com",
        phone: "+1 (555) 222-3333",
        status: "Inactive",
        avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=fee2e2&color=991b1b",
    }
];

export default function Members() {
    const [cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="w-full max-w-full">
            
            {/* Toolbar Section */}
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                
                {/* Left Side: Actions and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button className="inline-flex justify-center items-center gap-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm">
                        <Plus size={18} /> 
                        <span>Add Member</span>
                    </button>
                    
                    {/* Filter Badges */}
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors">
                            All Members
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-xs font-medium transition-colors">
                            Active
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-700 rounded-full text-xs font-medium transition-colors">
                            Inactive
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
                            placeholder="Search members..." 
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
                                    <th className="px-6 py-4">Member Info</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Role & Dept</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {mockMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                            {member.phone}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <p className="font-medium text-gray-800">{member.role}</p>
                                            <p className="text-xs text-gray-500">{member.department}</p>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                                                member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                                                member.status === 'On Leave' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' :
                                                'bg-rose-50 text-rose-700 ring-rose-600/20'
                                            }`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors ml-1">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Grid / Card View */}
            {cardGridEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockMembers.map((member) => (
                        <div key={member.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 p-5 flex flex-col">
                            
                            {/* Card Header (Avatar + Actions) */}
                            <div className="flex justify-between items-start mb-4">
                                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover" />
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                                <p className="text-sm font-medium text-gray-600">{member.role}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{member.department}</p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-2.5 mb-6 grow">
                                <div className="flex items-center gap-2.5 text-sm text-gray-500">
                                    <Mail size={15} className="text-gray-400" />
                                    <span className="truncate">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm text-gray-500">
                                    <Phone size={15} className="text-gray-400" />
                                    <span>{member.phone}</span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                                    member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                                    member.status === 'On Leave' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' :
                                    'bg-rose-50 text-rose-700 ring-rose-600/20'
                                }`}>
                                    {member.status}
                                </span>
                                
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}