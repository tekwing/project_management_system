import { useQuery } from '@tanstack/react-query';
import { getLeadStatus } from '../api/leadApi';

export const useLeadStatus = () => {
    return useQuery({
        queryKey: ['lead_status'],
        queryFn: () => getLeadStatus(),
        staleTime: 1000 * 60 * 5,
    });
};

