import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLeadActivity } from '../api/leadApi';

export const useCreateLeadActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLeadActivity,
        onSuccess: (_data, variables) => {
            // 🔥 INDUSTRY MAGIC: Force React Query to wipe out the old cache and fetch fresh leads!
            // The exact second you add a lead, the separate table page updates instantly in the background!
            queryClient.invalidateQueries({ queryKey: ['activities', variables.leadId] });
            queryClient.invalidateQueries({ queryKey: ['upcoming', variables.leadId] });
        }
    });
};