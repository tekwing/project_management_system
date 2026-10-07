import { useQuery } from '@tanstack/react-query';
import { getupcoming_actions } from '../api/leadApi';

export const useUpcomingActions = (id: string) => {
    return useQuery({
        queryKey: ['upcoming', id],
        queryFn: () => getupcoming_actions(id),
        staleTime: 1000 * 60 * 5,
    });
};

