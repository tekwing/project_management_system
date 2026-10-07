import { useQuery } from '@tanstack/react-query';
import { getLeadDetails } from '../api/leadApi';

export const useLeadDetails = (id: string) => {
    return useQuery({
        queryKey: ['lead', id], // Unique cache key combo tracking individual lead IDs
        queryFn: () => getLeadDetails(id),
        enabled: !!id, // Only run the API call if a valid ID string is present in the URL route
    });
};