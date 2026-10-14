import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../api/leadApi';
import type  { PaginatedLeads } from '../types/lead.types';

export const useLeads = (page: number = 1) => {
    return useQuery<PaginatedLeads>({
        queryKey: ['leads', page], // 💡 Global identifier cache key for leads data
        queryFn: ()=>getLeads(page),
        staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 minutes before checking Laravel again
    });
};