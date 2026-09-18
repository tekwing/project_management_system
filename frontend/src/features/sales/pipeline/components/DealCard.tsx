import type { Deal } from "../KanbanBoard";

type DealCardProps = {
  deal: Deal;
};

export default function DealCard({ deal }: DealCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("dealId", deal.id);
    setTimeout(() => {
      (e.target as HTMLElement).classList.add("opacity-40");
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).classList.remove("opacity-40");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-slate-300 transition-all group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
          {deal.title}
        </h3>
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <p className="text-slate-600 font-medium text-sm">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(deal.amount)}
        </p>
      </div>
    </div>
  );
}