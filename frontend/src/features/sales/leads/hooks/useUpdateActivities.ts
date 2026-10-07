import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateActivities } from '../api/leadApi';
import type { UpdateActivity } from '../types/lead.types';

export const useUpdateActivities = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            completingActivityId,
            formData,
        }: {
            completingActivityId: string;
            formData: UpdateActivity;
            leadId: string;
        }) => updateActivities(completingActivityId, formData),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['activities', variables.leadId] });
            queryClient.invalidateQueries({ queryKey: ['upcoming', variables.leadId] });
        },
    });
};