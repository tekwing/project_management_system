import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLeadStatus } from '../api/leadApi';
import type { UpdateLeadStatus } from '../types/lead.types';


export const useUpdateLeadStatus = () => {
    return useMutation({
        mutationFn:({
            lead_id,
            formData
        }:{
            lead_id: string;
            formData: UpdateLeadStatus;
        }) => updateLeadStatus(lead_id, formData),

        onSuccess: () => {
            
        },
    })
    
};