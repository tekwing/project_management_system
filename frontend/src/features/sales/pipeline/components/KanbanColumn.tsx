import type { Deal, Stage } from "../KanbanBoard"; // Adjust path if needed
import DealCard from "./DealCard";

type KanbanColumnProps = {
  stage: Stage;
  deals: Deal[];
  onDropDeal: (dealId: string, newStage: Stage) => void;
};

// 1. Define the specific Tailwind color classes for each stage
const STAGE_COLORS: Record<Stage, { topBorder: string; badgeBg: string; badgeText: string; columnBg: string }> = {
  Prospect: {
    topBorder: "border-indigo-500",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    columnBg: "bg-indigo-50/30",
  },
  Negotiation: {
    topBorder: "border-amber-500",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    columnBg: "bg-amber-50/30",
  },
  Won: {
    topBorder: "border-emerald-500",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    columnBg: "bg-emerald-50/30",
  },
  Lost: {
    topBorder: "border-rose-500",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    columnBg: "bg-rose-50/30",
  },
};

export default function KanbanColumn({
  stage,
  deals,
  onDropDeal,
}: KanbanColumnProps) {
  // Grab the colors for this specific stage
  const colors = STAGE_COLORS[stage];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    onDropDeal(dealId, stage);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      // Apply the dynamic background and top border colors here
      className={`${colors.columnBg} border border-slate-200 rounded-xl p-4 w-full flex flex-col gap-4 border-t-4 ${colors.topBorder} transition-colors`}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-bold text-slate-700 uppercase tracking-wider text-sm">
          {stage}
        </h2>

        {/* Apply the dynamic badge colors here */}
        <span
          className={`${colors.badgeBg} ${colors.badgeText} px-2.5 py-0.5 rounded-full text-xs font-bold`}
        >
          {deals.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 min-h-37.5">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}