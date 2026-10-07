
import { useLeads } from '../hooks/useLeads';
import { useNavigate } from "react-router-dom";
import {
    MoreVertical, 
    Mail, 
    Phone, 
    Building2,
} from "lucide-react";

export default function LeadCard(){
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leads?.length === 0 ? (
                <div>No Data</div>
            ):(leads?.map((lead) => (
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
                        <img src={lead.name} alt={lead.name} className="w-12 h-12 rounded-full border border-gray-200 object-cover shadow-sm" />
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
                            <span className="font-bold text-gray-900 leading-none">{lead.name}</span>
                        </div>
                    </div>
                    
                </div>
            )))}
        </div>
    )
}