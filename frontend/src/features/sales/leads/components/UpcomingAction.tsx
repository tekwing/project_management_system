import { useState } from "react";
import {Calendar, Check, X, Clock, Video} from "lucide-react";
import { useUpcomingActions } from '../hooks/useUpcomingActivities';
import { useUpdateActivities } from '../hooks/useUpdateActivities';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UpdateActivity } from '../types/lead.types';
import { useForm  } from 'react-hook-form';
import { toast } from "sonner";

const ActivitySchema = zod.object({
    actionNote: zod.string().trim().min(1, "Please enter meeting/follow-up notes"),
    nextActivityType: zod.string().optional(),
    meetingTitle: zod.string().optional(),
    date: zod.string().optional(),
    time: zod.string().optional(),
    followUpType: zod.string(),
    description: zod.string().optional(),
});
type ActivityFormData = zod.infer<typeof ActivitySchema>;

export default function UpcomingAction({id}:{id:string}){

    const {
        data: upcoming = [],
        isLoading,
        error
    } = useUpcomingActions(id);

    const [completingActivityId, setCompletingActivityId] = useState<string>('');

    const updateLeadActivity = useUpdateActivities();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm<ActivityFormData>({
        resolver: zodResolver(ActivitySchema),
        defaultValues: {
            actionNote: '',
            nextActivityType: '',
            meetingTitle: '',
            date: '',
            time: '',
            followUpType: '',
            description: '',
        },
    });

    const openCompletionModal = (activityId: string) => {
        setCompletingActivityId(activityId);
        reset({
            actionNote: '',
            nextActivityType: '',
            meetingTitle: '',
            date: '',
            time: '',
            followUpType: '',
            description: '',
        });
    };

    const nextActivityType = watch("nextActivityType");

    const onSubmit = async (data: ActivityFormData) => {
        const payload: UpdateActivity = {
            actionNote: data.actionNote,
            nextActivityType: data.nextActivityType ?? '',
            meetingTitle: data.meetingTitle ?? '',
            date: data.date ?? '',
            time: data.time ?? '',
            followUpType: data.followUpType ?? '',
            description: data.description ?? '',
        };

        try {
            await updateLeadActivity.mutateAsync({
                completingActivityId,
                formData: payload,
                leadId: id
            });

            reset();
            setCompletingActivityId('');
            toast.success("Activity updated successfully");
        } catch (error) {
            toast.error("Failed to update activity");
        }
    };


    const getCalendarDateParts = (dateString: any) => {
        if (!dateString) return { month: 'TBD', day: '--' };

        const datePart = String(dateString).split(' ')[0];
        const [year, month, day] = datePart.split('-').map(Number);

        if (!year || !month || !day) {
            return { month: 'TBD', day: '--' };
        }

        const d = new Date(year, month - 1, day);

        return {
            month: d.toLocaleDateString('en-US', { month: 'short' }),
            day: d.toLocaleDateString('en-US', { day: 'numeric' })
        };
    };

    const formatTime12Hour = (time24h: string) => {
        if (!time24h) return "";
        const [hourString, minute] = time24h.split(":");
        const hour = parseInt(hourString, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute} ${ampm}`;
    };

    const formatDate = (date?: string | null) => {
        if (!date) return "";

        const dateObj = new Date(date);

        if (isNaN(dateObj.getTime())) return "";

        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();

        return `${day}/${month}/${year}`;
    };
    return(
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Calendar size={16} className="text-indigo-500"/> Upcoming Actions
                    </h3>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-md">
                        {upcoming.length}
                    </span>
                </div>
                
                <div className="space-y-3 overflow-auto max-h-95">
                    {upcoming.length > 0 ? upcoming.map((act) => {
                        const dateParts = getCalendarDateParts(act.scheduled_at);
                        return (
                            <div key={act.id} className="flex gap-3 group relative bg-white border border-gray-100 hover:border-indigo-200 p-3 rounded-xl transition-all shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
                                <div className={`shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${act.type === 'meeting' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                                    <span className="text-[10px] font-bold uppercase leading-none mb-0.5">{dateParts.month}</span>
                                    <span className="text-lg font-black leading-none">{dateParts.day}</span>
                                </div>
                                <div className="pt-0.5 grow pr-8">
                                    <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors cursor-pointer">{act.type}</p>
                                    <div className="flex flex-col gap-0.5 mt-1.5">
                                        {act.scheduled_at && <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock size={12}/> {formatDate(act.scheduled_at)}</span>}
                                        {act.scheduled_at && <span className="flex items-center gap-1.5 text-xs text-gray-500"><Video size={12}/> {formatTime12Hour(act.scheduled_at) || "Anytime"}</span>}
                                    </div>
                                </div>

                                {/* MARK AS DONE BUTTON */}
                                <button 
                                    onClick={() => openCompletionModal(act.id)}
                                    title="Log Outcome"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-400 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                    <Check size={16} strokeWidth={3} />
                                </button>
                            </div>
                        )
                    }) : (
                        <p className="text-sm text-gray-500 italic text-center py-4">No upcoming actions scheduled.</p>
                    )}
                </div>
            </div>

            {/* COMPLETION MODAL */}
            {completingActivityId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="font-bold text-gray-900">Log Outcome</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Complete this activity and optionally schedule the next one.
                                </p>
                            </div>
                            <button
                                onClick={() => setCompletingActivityId('')}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-6 overflow-y-auto max-h-100">
                            <form id="completion-form" onSubmit={handleSubmit(onSubmit)}>
                                {/* Completion Note */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Meeting / Follow-up Notes
                                    </label>
                                    <textarea
                                        autoFocus
                                        {...register("actionNote")}
                                        placeholder="What was the outcome? Any important notes?"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-24 resize-y"
                                    />
                                    {errors.actionNote && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.actionNote.message}
                                        </p>
                                    )}
                                </div>
                                {/* Next Activity */}
                                <div className="border-t border-gray-100 pt-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800">
                                                Next Activity
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                Optional
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={!!nextActivityType}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setValue(
                                                            "nextActivityType",
                                                            "follow_up"
                                                        );
                                                    } else {
                                                        setValue(
                                                            "nextActivityType",
                                                            ""
                                                        );
                                                    }
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors">
                                                <div className="w-4 h-4 bg-white rounded-full shadow absolute left-0.5 top-0.5 peer-checked:translate-x-4 transition-transform" />
                                            </div>
                                        </label>
                                    </div>
                                    {nextActivityType && (
                                        <div className="space-y-4">
                                            {/* Activity Type */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                    Activity Type
                                                </label>
                                                <select
                                                    {...register("nextActivityType")}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                >
                                                    <option value="follow_up">Follow-up</option>
                                                    <option value="meeting">Meeting</option>
                                                </select>
                                            </div>
                                            {/* Meeting Title */}
                                            {nextActivityType === 'meeting' && (
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                        Meeting Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("meetingTitle")}
                                                        placeholder="e.g. Product Demo"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                            )}
                                            {nextActivityType === 'follow_up' && (
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                        Follow-up Type
                                                    </label>

                                                    <select
                                                        {...register("followUpType")}
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    >
                                                        <option value="">
                                                            Select follow-up type
                                                        </option>
                                                        <option value="call">
                                                            Call
                                                        </option>
                                                        <option value="whatsapp">
                                                            WhatsApp
                                                        </option>
                                                        <option value="email">
                                                            Email
                                                        </option>
                                                        <option value="follow_up">
                                                            General Follow-up
                                                        </option>
                                                    </select>
                                                </div>
                                            )}
                                            {/* Date + Time */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                        Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register("date")}
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                        Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        {...register("time")}
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                    Description
                                                </label>
                                                <textarea
                                                    {...register("description")}
                                                    placeholder="What needs to be discussed or followed up?"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-20 resize-y"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setCompletingActivityId('')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                form="completion-form"
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                {isSubmitting
                                ? "Saving..."
                                : "Mark as Done & Log"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}