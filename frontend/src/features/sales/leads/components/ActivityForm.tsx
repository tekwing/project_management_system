import * as zod from 'zod';
import { useCreateLeadActivity } from '../hooks/useCreateLeadActivity';
import type { CreateLeadActivity } from '../types/lead.types';
import { useForm  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";

interface ActivityFormProps {
  actionTab: "meeting" | "followup" | "note";
  leadId: string;
}

const leadActivitySchema = zod.object({
    scheduled_at_date: zod.string().optional(),
    scheduled_at_time: zod.string().optional(),
    scheduled_type: zod.string().optional(),
    description: zod.string().optional(),
    next_action: zod.string().optional(),
});
type ActivityFormData = zod.infer<typeof leadActivitySchema>;

export default function ActivityForm({actionTab, leadId}:ActivityFormProps){

    const createLeadActivity = useCreateLeadActivity();
        const {
            register,
            handleSubmit,
            reset,
            formState: { isSubmitting },
        } = useForm<ActivityFormData>({
            resolver: zodResolver(leadActivitySchema),
            defaultValues: {
            next_action: '',
            scheduled_at_date: '',
            scheduled_at_time: '',
            scheduled_type: 'Call',
            description: '',
            },
        });

    const onSubmit = async (data: ActivityFormData) => {

        const payload: CreateLeadActivity = {
            type: actionTab,
            description: data.description ?? '',
            next_action: data.next_action,
            scheduled_at_date: data.scheduled_at_date,
            scheduled_at_time: data.scheduled_at_time,
        };

        try {
            await createLeadActivity.mutateAsync({
                leadId,
                payload,
            });

            reset();
            toast.success("Activity Added successfully");
        } catch (error) {
            toast.success("Failed to create lead activity");
            console.error('Failed to create lead activity:', error);
        }
    };

    return(
        <><form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
                {/* Meeting Form */}
                {actionTab === 'meeting' && (
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input  {...register('next_action')} type="text" placeholder="Meeting Title..." className="col-span-2 text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                        <input  {...register('scheduled_at_date')} type="date" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                        <input  {...register('scheduled_at_time')} type="time" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                    </div>
                )}

                {/* Follow-up Form */}
                {actionTab === 'followup' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <input  {...register('scheduled_at_date')}  type="date" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                        <input  {...register('scheduled_at_time')} type="time" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                        <select  {...register('next_action')} className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all">
                            <option value="Call">Call</option>
                            <option value="Email">Email</option>
                            <option value="LinkedIn Message">LinkedIn Message</option>
                        </select>
                    </div>
                )}

                {/* Main Note Text Area */}
                <textarea 
                    {...register('description')}
                    placeholder={
                        actionTab === 'note' ? "Start typing to log a note..." : 
                        actionTab === 'meeting' ? "Meeting agenda or description (optional)..." : 
                        "What needs to be done? (optional)"
                    } 
                    className="w-full text-sm outline-none resize-y min-h-15 p-2 bg-transparent"
                />
                
                {/* Submit Action */}
                <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                        ? 'Saving...'
                        : actionTab === 'note'
                            ? 'Save Note'
                            : actionTab === 'meeting'
                            ? 'Schedule Meeting'
                            : 'Set Follow-up'}
                    </button>
                </div>
            </div>
        </form></>
    )
}