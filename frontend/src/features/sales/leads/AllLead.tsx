import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Edit2, 
    Mail, 
    Phone, 
    Building2,
    Table as TableIcon,
    LayoutGrid
} from "lucide-react";

// Dummy data to populate the leads table and grid
const mockLeads = [
    {
        id: "LD-001",
        name: "Alice Freeman",
        company: "TechNova Solutions",
        email: "alice@technova.com",
        phone: "+1 (555) 123-4567",
        status: "New",
        value: "$12,500",
        dateAdded: "Sep 15, 2026",
        avatar: "https://ui-avatars.com/api/?name=Alice+Freeman&background=e0e7ff&color=4f46e5",
    },
    {
        id: "LD-002",
        name: "Marcus Johnson",
        company: "Global Retail Inc.",
        email: "mjohnson@globalretail.com",
        phone: "+1 (555) 987-6543",
        status: "Contacted",
        value: "$8,200",
        dateAdded: "Sep 16, 2026",
        avatar: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=ffedd5&color=c2410c",
    },
    {
        id: "LD-003",
        name: "Sophia Chen",
        company: "Apex Innovations",
        email: "schen@apex.io",
        phone: "+1 (555) 456-7890",
        status: "Qualified",
        value: "$24,000",
        dateAdded: "Sep 17, 2026",
        avatar: "https://ui-avatars.com/api/?name=Sophia+Chen&background=dcfce3&color=166534",
    },
    {
        id: "LD-004",
        name: "David Smith",
        company: "Smith & Co. Legal",
        email: "david@smithlegal.com",
        phone: "+1 (555) 222-3333",
        status: "Lost",
        value: "$5,000",
        dateAdded: "Sep 10, 2026",
        avatar: "https://ui-avatars.com/api/?name=David+Smith&background=fee2e2&color=991b1b",
    }
];

export default function AllLead() {
    const navigate = useNavigate();
    const [cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Helper for Status badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-50 text-blue-700 ring-blue-600/20";
            case "Contacted": return "bg-amber-50 text-amber-700 ring-amber-600/20";
            case "Qualified": return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
            case "Lost": return "bg-rose-50 text-rose-700 ring-rose-600/20";
            default: return "bg-gray-100 text-gray-700 ring-gray-500/20";
        }
    };

    return (
        <div className="w-full max-w-full">
            
            {/* Toolbar Section */}
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                
                {/* Left Side: Actions and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button className="inline-flex justify-center items-center gap-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
                        <Plus size={18} /> 
                        <span>Add Lead</span>
                    </button>
                    
                    {/* Filter Badges */}
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors">
                            All Leads
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-full text-xs font-medium transition-colors">
                            New
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700 rounded-full text-xs font-medium transition-colors">
                            Contacted
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-xs font-medium transition-colors">
                            Qualified
                        </button>
                    </div>
                </div>
                
                {/* Right Side: Search & View Toggles */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search leads or companies..." 
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
                                    <th className="px-6 py-4">Lead Contact</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Est. Value</th>
                                    <th className="px-6 py-4">Date Added</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {mockLeads.map((lead) => (
                                    <tr 
                                            key={lead.id} 
                                            onClick={() => navigate(`/sales/lead/details/${lead.id}`)} // 3. Add onClick
                                            className="hover:bg-gray-50/50 transition-colors group cursor-pointer" // 4. Add cursor-pointer
                                        >
                                        
                                        {/* Lead Contact Info */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{lead.name}</p>
                                                    <div className="flex items-center gap-3 mt-0.5">
                                                        <span className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">
                                                            <Mail size={12} /> {lead.email}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Phone size={12} /> {lead.phone}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company Info */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Building2 size={16} className="text-gray-400" />
                                                {lead.company}
                                            </div>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadge(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>

                                        {/* Estimated Value */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-1 text-gray-900 font-semibold">
                                                {lead.value}
                                            </div>
                                        </td>

                                        {/* Date Added */}
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                            {lead.dateAdded}
                                        </td>

                                        {/* Actions */}
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit Lead">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors ml-1" title="More Options">
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
                    {mockLeads.map((lead) => (
                        <div 
                            key={lead.id} 
                            onClick={() => navigate(`/sales/lead/details/${lead.id}`)} // 3. Add onClick
                            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 p-5 flex flex-col cursor-pointer" // 4. Add cursor-pointer
                        >
                            
                            {/* Card Header (Company + Actions) */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider line-clamp-1 pr-2">
                                    <Building2 size={14} className="text-gray-400" /> 
                                    {lead.company}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600 -mr-1 p-1">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className="flex items-center gap-3 mb-5">
                                <img src={lead.avatar} alt={lead.name} className="w-12 h-12 rounded-full border border-gray-200 object-cover shadow-sm" />
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                        {lead.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">{lead.id}</p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-2.5 mb-6 grow">
                                <div className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    <Mail size={15} className="text-gray-400" />
                                    <span className="truncate">{lead.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    <Phone size={15} className="text-gray-400" />
                                    <span>{lead.phone}</span>
                                </div>
                            </div>

                            {/* Card Footer (Status + Value) */}
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${getStatusBadge(lead.status)}`}>
                                    {lead.status}
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400 font-medium mb-0.5">Est. Value</span>
                                    <span className="font-bold text-gray-900 leading-none">{lead.value}</span>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}