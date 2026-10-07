import axios from 'axios';
import type  { 
    Lead, 
    CreateLeadPayload, 
    ApiResponse, 
    LeadDetailsData, 
    CreateLeadActivity, 
    LeadActivity, 
    ActivitiesResponse, 
    Activity,
    UpdateActivity, LeadStatus  } 
    from '../types/lead.types';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:2000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',                                             
    }
});

apiClient.interceptors.request.use((config) => {
    const token = '1|Fietb4fyZQodMaya2vH4vOFseiRUJ9PhKQO2Sfra37f655c7'; // Dynamic retrieval later
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Clean, type-safe API calls
export const getLeads = async (): Promise<Lead[]> => {
    const response = await apiClient.get<ApiResponse<Lead[]>>('/leads');
    return response.data.data;
};

export const createLead = async (payload: CreateLeadPayload): Promise<Lead> => {
    const response = await apiClient.post<ApiResponse<Lead>>('/leads', payload);
    return response.data.data;
};

export const getLeadDetails = async (id: string): Promise<LeadDetailsData> => {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data.data;
};

export const createLeadActivity = async ({
    leadId,
    payload,
}: {
    leadId: string;
    payload: CreateLeadActivity;
}): Promise<LeadActivity> => {
    const response = await apiClient.post<ApiResponse<LeadActivity>>(
        `/leads/${leadId}/activities`,
        payload
    );

    return response.data.data;
};

export const getactivities = async (id:string, cursor?: string): Promise<ActivitiesResponse> => {
    const response = 
    await apiClient.get<ActivitiesResponse>
    (`/leads/${id}/activities`,{
            params: cursor ? { cursor } : undefined,
        });
    return response.data;
};

export const getupcoming_actions = async (
    id: string
): Promise<Activity[]> => {

    const response = await apiClient.get<ApiResponse<Activity[]>>(
        `/leads/${id}/activities/upcoming`
    );

    return response.data.data;
};

export const updateActivities = async (
    id: string,
    formData: UpdateActivity 
): Promise<Activity> => {

    const response = await apiClient.put<ApiResponse<Activity>>(
        `/leads/activities/${id}/update`,
        formData
    );

    return response.data.data;
};

export const getLeadStatus = async (): Promise<LeadStatus[]> => {

    const response = await apiClient.get<ApiResponse<LeadStatus[]>>(
        `/lead-statuses`
    );

    return response.data.data;
};

