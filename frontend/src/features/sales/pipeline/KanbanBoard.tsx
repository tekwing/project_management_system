import { useState, useMemo } from "react";
import KanbanColumn from "./components/KanbanColumn"; // Adjust path if needed

export type Stage = "Prospect" | "Negotiation" | "Won" | "Lost";

export type Deal = {
  id: string;
  title: string;
  amount: number;
  stage: Stage;
};

const STAGES: Stage[] = ["Prospect", "Negotiation", "Won", "Lost"];

const INITIAL_DEALS: Deal[] = [
  { id: "1", title: "Acme Corp Redesign", amount: 5000, stage: "Prospect" },
  { id: "2", title: "Global Tech App", amount: 12000, stage: "Negotiation" },
  { id: "3", title: "Local Bakery POS", amount: 1500, stage: "Prospect" },
];

export default function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrop = (dealId: string, newStage: Stage) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
  };

  // 1. Filter deals based on the search query (Derived State)
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) =>
      deal.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [deals, searchQuery]);

  // 2. Calculate the total value of the currently visible deals
  const totalPipelineValue = useMemo(() => {
    return filteredDeals.reduce((sum, deal) => sum + deal.amount, 0);
  }, [filteredDeals]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Sales Pipeline
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Drag and drop deals to update their stage.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-colors text-sm">
          + New Deal
        </button>
      </div>

      {/* Toolbar: Search and Metrics */}
      <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search deals by name..."
            className="outline-none bg-transparent w-full text-sm text-slate-700 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Pipeline Value Metric */}
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Visible Pipeline Value
          </p>
          <p className="text-2xl font-extrabold text-slate-800">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totalPipelineValue)}
          </p>
        </div>
      </div>

      {/* Board Area */}
      <div className="grid grid-cols-4 gap-6 items-start pb-4">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            // Pass the FILTERED deals to the columns, not the raw deals
            deals={filteredDeals.filter((deal) => deal.stage === stage)}
            onDropDeal={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}