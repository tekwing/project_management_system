import { 
    Mail, CheckCircle2, PhoneCall, User, Calendar, Video, AlertCircle,FileText
} from "lucide-react";

import { useActivities } from '../hooks/useActivities';
import { useEffect, useRef } from 'react';

export default function ActivityList({id}:{id:string}){
    const getActivityConfig = (type: string) => {
        switch(type) {
            case "email": return { icon: Mail, color: "text-blue-500", bg: "bg-blue-50" };
            case "call": return { icon: PhoneCall, color: "text-emerald-500", bg: "bg-emerald-50" };
            case "status": return { icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-50" };
            case "meeting": return { icon: Video, color: "text-purple-500", bg: "bg-purple-50" };
            case "followup": return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" };
            case "note": return { icon: FileText, color: "text-gray-600", bg: "bg-gray-100" };
            default: return { icon: User, color: "text-gray-500", bg: "bg-gray-100" };
        }
    };

    // 💡 Fetch caching state directly out of our React Query custom hook
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useActivities(id);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (
                    firstEntry.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.1,
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    ]);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const activities = data?.pages.flatMap(page => page.data) ?? [];
    if (isLoading) {
        return <div>Loading activities...</div>;
    }
    if (error) {
        return <div>Failed to load activities.</div>;
    }

    
    return(
        <>
        <div className="h-150 overflow-y-auto pr-4">
            <div ref={scrollContainerRef} className="relative border-l-2 border-gray-100 ml-5 space-y-8 pb-4">
                {activities.map((activity) => {
                    const config = getActivityConfig(activity.type);
                    const Icon = config.icon;
                    
                    return (
                        <div key={activity.id} className="relative pl-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div
                                className={`absolute -left-4.25 top-0.5 w-8 h-8 rounded-full ring-4 ring-white flex items-center justify-center ${config.bg} ${config.color}`}
                            >
                                <Icon size={14} />
                            </div>

                            <div>
                                {/* Activity type + created date */}
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                    <span className="font-medium text-gray-900 text-sm capitalize">
                                        {activity.type}
                                    </span>

                                    <span className="text-gray-300 hidden sm:inline">•</span>

                                    <span className="text-xs text-gray-500">
                                        {new Date(activity.created_at).toLocaleString()}
                                    </span>
                                </div>

                                {/* User */}
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                    By {activity.user?.name || 'System'}
                                </p>

                                {/* Scheduled date/time */}
                                {activity.scheduled_at && (
                                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-2 py-1 mb-2">
                                        <Calendar size={13} />

                                        <span>
                                            Scheduled:{' '}
                                            {new Date(activity.scheduled_at).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                )}

                                {/* Title + description */}
                                {(activity.next_action || activity.description) && (
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mt-2">
                                        {activity.next_action && (
                                            <div className="flex items-center gap-2 mb-1">
                                                {activity.type === 'followup' && (
                                                    <span className="text-xs font-medium text-indigo-600">
                                                        Follow-up:
                                                    </span>
                                                )}

                                                <span className="text-sm font-semibold text-gray-800">
                                                    {activity.next_action}
                                                </span>
                                            </div>
                                        )}

                                        {activity.description && (
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                                {activity.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {/* Status History */}
                                {activity.status_history && activity.status_history.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {activity.status_history.map((history, index) => (
                                            <div key={index} className="text-[11px]">
                                                {/* History */}
                                                <div className="flex items-start gap-1.5 text-gray-500">
                                                    <span className="text-gray-300 shrink-0">└─</span>

                                                    {/* History date */}
                                                    {history.at && (
                                                        <span className="shrink-0 text-gray-400">
                                                            {new Date(history.at).toLocaleString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    )}

                                                    <span className="text-gray-300">•</span>

                                                    {/* Action / Status */}
                                                    <span className="font-medium capitalize">
                                                        {history.status.replace(/_/g, ' ')}
                                                    </span>

                                                    <span className="text-gray-300">•</span>

                                                    {/* Message */}
                                                    <span>
                                                        {history.message}
                                                    </span>
                                                </div>

                                                {/* Scheduled date */}
                                                {history.scheduled_at && (
                                                    <div className="ml-5 mt-0.5 text-[10px] text-indigo-400">
                                                        Scheduled for{' '}
                                                        {new Date(history.scheduled_at).toLocaleString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                            }
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}


                            </div>
                        </div>

                    )
                })}
                {hasNextPage && (
                    <div className="flex justify-center py-4">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg disabled:opacity-50"
                        >
                            {isFetchingNextPage
                                ? 'Loading...'
                                : 'Load more'}
                        </button>
                    </div>
                )}
                {!hasNextPage && activities.length > 0 && (
                    <div className="text-center text-sm text-gray-400 py-4">
                        No more activities
                    </div>
                )}
            </div>
        </div>
        </>
    )
}