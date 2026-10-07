
import { useLeads } from '../hooks/useLeads';
import { useNavigate } from "react-router-dom";
import {
    MoreVertical, 
    Edit2, 
    Mail, 
    Phone, 
    Building2,
} from "lucide-react";

export default function LeadTable(){
    const navigate = useNavigate();
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-50 text-blue-700 ring-blue-600/20";
            case "Contacted": return "bg-amber-50 text-amber-700 ring-amber-600/20";
            case "Qualified": return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
            case "Lost": return "bg-rose-50 text-rose-700 ring-rose-600/20";
            default: return "bg-gray-100 text-gray-700 ring-gray-500/20";
        }
    };
   // 💡 Fetch caching state directly out of our React Query custom hook
    const { data: leads, isLoading, error } = useLeads();

    if (isLoading) return <p style={{ textAlign: 'center' }}>Loading your production grid...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error loading data from Laravel API.</p>;
    return(
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
                        {leads?.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>No leads logged yet.</td>
                            </tr>
                        ):(
                        leads?.map((lead) => (
                            <tr 
                                    key={lead.id} 
                                    onClick={() => navigate(`/sales/lead/details/${lead.id}`)} // 3. Add onClick
                                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer" // 4. Add cursor-pointer
                                >
                                
                                {/* Lead Contact Info */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={lead.name} alt={lead.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
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
                                        {lead.name}
                                    </div>
                                </td>

                                {/* Date Added */}
                                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {lead.name}
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
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}