import { useState } from "react";
import LeadCard from "../components/LeadCards";
import LeadTable from "../components/LeadTable";
import { 
    Plus, 
    Search, 
    Table as TableIcon,
    LayoutGrid
} from "lucide-react";


export default function AllLead() {
    
    const [cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Helper for Status badges
    

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
                <LeadTable/>
            )}

            {/* Grid / Card View */}
            {cardGridEnabled && (
                <LeadCard/>
            )}
        </div>
    );
}