
import { useLeads } from '../hooks/useLeads';
import { useNavigate } from "react-router-dom";
import {
    MoreVertical, 
    Mail, 
    Phone, 
    Building2,
} from "lucide-react";

type LeadCardProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function LeadCard({
    currentPage,
    onPageChange,
    }: LeadCardProps){
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
    const { data: leadsResponse, isLoading, error, isFetching } = useLeads(currentPage);

    const leads = leadsResponse?.data ?? [];
    const meta = leadsResponse?.meta;

    const totalPages = meta?.last_page ?? 1;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const delta = 2;

        pages.push(1);

        if (currentPage - delta > 2) {
            pages.push("...");
        }

        for (
            let page = Math.max(2, currentPage - delta);
            page <= Math.min(totalPages - 1, currentPage + delta);
            page++
        ) {
            pages.push(page);
        }

        if (currentPage + delta < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 rounded-xl bg-white">
            <div className="loader" role="status" aria-label="Loading" />

            <p
                className="animate-pulse text-sm font-medium text-indigo-600"
                aria-live="polite"
            >
                Loading leads...
            </p>

            <style>
                {`
                .loader {
                    width: 22px;
                    aspect-ratio: 1;
                    background: #4f46e5;
                    box-shadow: 0 0 30px 8px rgb(79 70 229 / 25%);
                    transform: translateX(-65px);
                    clip-path: inset(0);
                    animation:
                    loader-move 0.8s ease-in-out infinite alternate,
                    loader-clip 1.6s ease-in-out infinite;
                }

                @keyframes loader-move {
                    to {
                    transform: translateX(65px);
                    }
                }

                @keyframes loader-clip {
                    33% {
                    clip-path: inset(0 0 0 -70px);
                    }
                    50% {
                    clip-path: inset(0);
                    }
                    83% {
                    clip-path: inset(0 -70px 0 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .loader {
                    animation: none;
                    transform: none;
                    clip-path: none;
                    }
                }
                `}
            </style>
            </div>
        );
        }
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error loading data from Laravel API.</p>;
    return(
        <>
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
                            {/* <img src={lead.name} alt={lead.name} className="w-12 h-12 rounded-full border border-gray-200 object-cover shadow-sm" /> */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center
                                            rounded-full border border-gray-200 bg-indigo-50
                                            font-semibold text-indigo-600">
                                {lead.name?.charAt(0).toUpperCase() ?? "?"}
                            </div>
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-gray-200 bg-white rounded-xl px-6 py-4">

                <p className="text-sm text-gray-500">
                    Showing {meta?.from ?? 0} to {meta?.to ?? 0} of {meta?.total ?? 0} leads
                </p>

                <div className="flex items-center gap-2">

                    {/* Previous */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || isFetching}
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 py-2 text-gray-400"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                type="button"
                                onClick={() => onPageChange(page as number)}
                                disabled={isFetching || page === currentPage}
                                aria-current={
                                    page === currentPage ? "page" : undefined
                                }
                                className={`rounded-md border px-3 py-2 text-sm ${
                                    page === currentPage
                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                        : "border-gray-300 hover:bg-gray-50"
                                } disabled:cursor-not-allowed`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    {/* Next */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || isFetching}
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>
            </div>
        </>
        
        
    )
}