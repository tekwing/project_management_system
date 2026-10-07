export interface Lead {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    job_title: string | null;
    source: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';
    created_at: string;
    updated_at: string;
}

export interface CreateLeadPayload {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    job_title?: string;  
    status_id?: string;  
    source?: string;
    notes?: string;
    assignee?:string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ActivityUser {
    id: number;
    name: string;
    email: string;
}

export interface LeadActivity {
  id: number;
  type: string;
  next_action?: string;
  status_value?: string;
  scheduled_at?: string;
  created_at: string;
  description: string;
  user: ActivityUser | null;
}

export interface LeadDetailsData extends Lead {
    activities_preview: LeadActivity[];
}

export interface CreateLeadActivity {
    type: string;
    next_action?: string;
    status_value?: string;
    scheduled_at_date?: string;
    scheduled_at_time?: string;
    description: string;
}

export interface Activity {
    id: string;
    type: string;
    created_at: string;
    scheduled_at?: string | null;
    next_action?: string | null;
    description?: string | null;
    status?: string | null;
    status_history?: {
        status: string;
        message: string;
        scheduled_at?: string;
        at: string;
    }[] | null;
    user?: {
        id: string;
        name: string;
    } | null;
}

export interface ActivitiesResponse {
    data: Activity[];

    meta: {
        next_cursor: string | null;
        prev_cursor: string | null;
        per_page: number;
    };
}

export interface UpdateActivity{
    actionNote: string,
    nextActivityType: string,
    meetingTitle: string,
    date: string,
    time: string,
    followUpType: string,
    description: string
}

export interface LeadStatus{
    id: number,
    name: string,
    color: string | null,
    sort_order: string,
    is_final: boolean
}
