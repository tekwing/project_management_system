import { useInfiniteQuery } from '@tanstack/react-query';
import { getactivities } from '../api/leadApi';

export const useActivities = (id:string) => {
    return useInfiniteQuery({
        queryKey: ['activities', id], 
        queryFn: ({ pageParam }) => getactivities(id, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.next_cursor ?? undefined;
        },
        staleTime: 1000 * 60 * 5, 
    });
};