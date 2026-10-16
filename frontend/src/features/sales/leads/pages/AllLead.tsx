import { useState } from "react";
import LeadCard from "../components/LeadCards";
import LeadTable from "../components/LeadTable";
import { 
    Plus, 
    Search, 
    Table as TableIcon,
    LayoutGrid,Filter, ChevronDown, Check, X}from 'lucide-react';
import { useLeadStatus } from '../hooks/useLeadStatus';
import { useEffect, useRef } from 'react';

export default function AllLead() {
    
    const [cardGridEnabled, setCardGrid] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data: statuses, isLoading, error } = useLeadStatus();
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    const statusFilterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                statusFilterRef.current &&
                !statusFilterRef.current.contains(event.target as Node)
            ) {
                setShowStatusFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedStatusData = statuses?.find(
        (status) => String(status.id) === selectedStatus
    );

    return (
        <div className="w-full max-w-full">
            
            {/* Toolbar Section */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                    {/* Left: Primary Action */}
                    <div>
                        <button
                            onClick={() => {/* Open your Add Lead form/modal */}}
                            className="inline-flex items-center justify-center gap-2 rounded-lg
                                bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
                                shadow-sm transition-colors hover:bg-indigo-700
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                focus:ring-offset-2"
                        >
                            <Plus size={18} />
                            Add Lead
                        </button>
                    </div>

                    {/* Right: Filters, Search & View Toggle */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        {/* Status Dropdown */}
                        <div ref={statusFilterRef} className="relative w-full sm:w-44">
                            <div
                                className={`flex w-full items-center rounded-lg border transition-colors ${
                                    selectedStatus !== 'all'
                                        ? 'border-indigo-200 bg-indigo-50'
                                        : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                            >
                                {/* Dropdown trigger */}
                                <button
                                    type="button"
                                    onClick={() => setShowStatusFilter(prev => !prev)}
                                    aria-expanded={showStatusFilter}
                                    className={`flex min-w-0 flex-1 items-center justify-between gap-2
                                        px-3 py-2.5 text-sm ${
                                            selectedStatus !== 'all'
                                                ? 'text-indigo-700'
                                                : 'text-gray-600'
                                        }`}
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        <Filter size={16} className="shrink-0" />

                                        {selectedStatusData && (
                                            <span
                                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                style={{ backgroundColor: selectedStatusData.color?? '#9CA3AF' }}
                                            />
                                        )}

                                        <span className="truncate">
                                            {selectedStatusData?.name ?? 'All statuses'}
                                        </span>
                                    </span>

                                    <ChevronDown
                                        size={15}
                                        className={`shrink-0 transition-transform ${
                                            showStatusFilter ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Reset selected status */}
                                {selectedStatus !== 'all' && (
                                    <button
                                        type="button"
                                        title="Clear status filter"
                                        aria-label="Clear status filter"
                                        onClick={() => {
                                            console.log('Selected status:', selectedStatus);
                                            setSelectedStatus('all');
                                            setCurrentPage(1);
                                            setShowStatusFilter(false);
                                        }}
                                        className="mr-2 flex h-6 w-6 shrink-0 items-center
                                            justify-center rounded-md text-indigo-500
                                            transition-colors hover:bg-indigo-100 hover:text-indigo-800"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Dropdown menu */}
                            {showStatusFilter && (
                                <div
                                    className="absolute right-0 top-full z-50 mt-2
                                        max-h-72 w-full min-w-52 overflow-y-auto
                                        rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log('Selected status:', selectedStatus);
                                            setSelectedStatus('all');
                                            setCurrentPage(1);
                                            setShowStatusFilter(false);
                                        }}
                                        className={`flex w-full items-center justify-between
                                            rounded-lg px-3 py-2.5 text-left text-sm ${
                                                selectedStatus === 'all'
                                                    ? 'bg-indigo-50 font-medium text-indigo-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        All statuses
                                        {selectedStatus === 'all' && <Check size={16} />}
                                    </button>

                                    {statuses?.map((status) => (
                                        <button
                                            type="button"
                                            key={status.id}
                                            onClick={() => {
                                                console.log('Selected status:', selectedStatus);
                                                setSelectedStatus(String(status.id));
                                                setCurrentPage(1);
                                                setShowStatusFilter(false);
                                            }}
                                            className={`flex w-full items-center justify-between gap-3
                                                rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                                    selectedStatus === String(status.id)
                                                        ? 'bg-gray-50 font-medium text-gray-900'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="flex min-w-0 items-center gap-2.5">
                                                <span
                                                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                    style={{ backgroundColor: status.color?? '#9CA3AF' }}
                                                />

                                                <span className="truncate">{status.name}</span>
                                            </span>

                                            {selectedStatus === String(status.id) && (
                                                <Check size={16} className="shrink-0 text-indigo-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <Search
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2
                                    -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search leads or companies..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="block w-full rounded-lg border border-gray-200
                                    bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900
                                    transition-colors placeholder:text-gray-400
                                    focus:border-indigo-500 focus:bg-white
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex shrink-0 items-center justify-center gap-1
                            rounded-lg border border-gray-200 bg-gray-100 p-1">
                            <button
                                onClick={() => setCardGrid(false)}
                                title="Table View"
                                aria-label="Table View"
                                aria-pressed={!cardGridEnabled}
                                className={`flex items-center justify-center rounded-md p-2
                                    transition-all ${
                                        !cardGridEnabled
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <TableIcon size={18} />
                            </button>

                            <button
                                onClick={() => setCardGrid(true)}
                                title="Grid View"
                                aria-label="Grid View"
                                aria-pressed={cardGridEnabled}
                                className={`flex items-center justify-center rounded-md p-2
                                    transition-all ${
                                        cardGridEnabled
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table View */}
            {!cardGridEnabled && (
                <LeadTable
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    selectedStatus={selectedStatus}/>
            )}

            {/* Grid / Card View */}
            {cardGridEnabled && (
                <LeadCard
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                selectedStatus={selectedStatus}/>
            )}
        </div>
    );
}