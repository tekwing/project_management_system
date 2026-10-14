import { ChevronDown } from "lucide-react";
import { useLeadStatus } from "../hooks/useLeadStatus";
import { useUpdateLeadStatus } from "../hooks/useUpdateLeadStatus";
import { useState } from "react";
import { toast } from "sonner";

interface LeadStatusDropdownProps {
    leadId: number;
    status: string;
}

export default function LeadStatusDropdown({
    leadId,
    status,
}: LeadStatusDropdownProps) {
    const [statusOpen, setStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status);

    const {
        data: leadStatuses = [],
    } = useLeadStatus();

    const leadStatusDropdown = leadStatuses.map((item) => ({
        label: item.name,
        value: String(item.id),
        color: item.color,
    }));

    const currentStatus = leadStatusDropdown.find(
        (item) => item.value === String(selectedStatus)
    );

    const {
        mutate: updateLeadStatus,
    } = useUpdateLeadStatus();

    const handleStatusChange = (statusId: string) => {
        setSelectedStatus(statusId);
        setStatusOpen(false);

        updateLeadStatus({
            lead_id: String(leadId),
            formData: {
                status_id: Number(statusId),
            },
        },
        {
            onSuccess: () => {
                toast.success("Lead status updated successfully");
            },
            onError: () => {
                toast.error("Failed to update lead status");
            },
        });
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setStatusOpen(!statusOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border shadow-sm transition-colors"
                style={{
                    backgroundColor: currentStatus?.color
                        ? `${currentStatus.color}15`
                        : "#F3F4F6",
                    color: currentStatus?.color ?? "#374151",
                    borderColor: currentStatus?.color
                        ? `${currentStatus.color}40`
                        : "#D1D5DB",
                }}
            >
                <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                        backgroundColor:
                            currentStatus?.color ?? "#9CA3AF",
                    }}
                />

                {currentStatus?.label ?? "Select Status"}

                <ChevronDown
                    size={16}
                    className="ml-1"
                />
            </button>

            {statusOpen && (
                <div className="absolute z-50 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1">
                    {leadStatusDropdown.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => handleStatusChange(item.value)}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: item.color ?? "#9CA3AF",
                                }}
                            />

                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
