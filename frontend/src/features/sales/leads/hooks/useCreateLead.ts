import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLead } from '../api/leadApi';

export const useCreateLead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLead,
        onSuccess: () => {
            // The exact second you add a lead, the separate table page updates instantly in the background!
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        }
    });
};