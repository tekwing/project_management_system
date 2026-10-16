import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../api/leadApi';
import type  { PaginatedLeads } from '../types/lead.types';

export const useLeads = (
    page: number = 1,
    statusId: string = 'all'
) => {
    return useQuery<PaginatedLeads>({
        queryKey: ['leads', page, statusId],
        queryFn: () =>
            getLeads(
                page,
                statusId === 'all' ? undefined : statusId
            ),
        staleTime: 1000 * 60 * 5,
    });
};