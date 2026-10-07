import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../api/leadApi';

export const useLeads = () => {
    return useQuery({
        queryKey: ['leads'], // 💡 Global identifier cache key for leads data
        queryFn: getLeads,
        staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 minutes before checking Laravel again
    });
};