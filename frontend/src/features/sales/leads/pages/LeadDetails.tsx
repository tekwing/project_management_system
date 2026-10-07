import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { 
    ArrowLeft, Mail, Phone, Building2,Briefcase, 
    Edit2, Trash2, Clock, 
    CalendarPlus, AlertCircle, ChevronDown, X
} from "lucide-react";

import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import UpcomingAction from '../components/UpcomingAction'
import { useLeadDetails } from '../hooks/useLeadDetails';

// Mock data for a single lead
const leadData = {
    id: "LD-001",
    name: "Alice Freeman",
    title: "VP of Engineering",
    company: "TechNova Solutions",
    email: "alice@technova.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    status: "New",
    value: "$12,500",
    source: "Website Referral",
    industry: "Software Development",
    website: "www.technova.com",
    dateAdded: "Sep 15, 2026",
    avatar: "https://ui-avatars.com/api/?name=Alice+Freeman&background=e0e7ff&color=4f46e5",
};


// Initial state for history log
const initialHistory = [
    {
        id: 101,
        type: "email",
        title: "Sent introductory email with pricing deck",
        date: "Sep 18, 2026 at 10:30 AM",
        user: "You"
    },
    {
        id: 102,
        type: "call",
        title: "Discovery Call (15 mins)",
        date: "Sep 17, 2026 at 2:00 PM",
        user: "You",
        note: "Alice is very interested in the Enterprise tier. They need SSO and custom reporting. Scheduled a full demo for next Tuesday."
    }
];

export default function LeadDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: lead, isLoading, error } = useLeadDetails(id ?? '');

    const [leadStatus, setLeadStatus] = useState(leadData.status);
    
    const [history, setHistory] = useState(initialHistory);
    
    // Tab & Input States
    const [actionTab, setActionTab] = useState<'note' | 'meeting' | 'followup'>('note');

    // Date formatting helpers
    const getFormattedNow = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
               " at " + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
            case "Contacted": return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
            case "Qualified": return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
            case "Lost": return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
            default: return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
        }
    };

    const [statusOpen, setStatusOpen] = useState(false);

    const statuses = [
        { value: "New", label: "New Lead", color: "bg-blue-500" },
        { value: "Contacted", label: "Contacted", color: "bg-yellow-500" },
        { value: "Qualified", label: "Qualified", color: "bg-emerald-500" },
        { value: "Lost", label: "Lost", color: "bg-red-500" },
    ];

    const currentStatus = statuses.find(
        (status) => status.value === leadStatus
    );

    if (isLoading) return <div className="p-8 text-center text-gray-500">Retrieving full lead memory file...</div>;
    if (error || !lead) return <div className="p-8 text-center text-red-500">Error mapping profile records. It may have been deleted.</div>;
    
    return (
        <div className="w-full max-w-7xl mx-auto pb-10 mt-6 relative">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={()=> navigate(`/sales/leads`)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={16} /> Back to Leads
                </button>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100" title="Delete Lead">
                        <Trash2 size={18} />
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                        Convert to Customer
                    </button>
                </div>
            </div>

            {/* Main Header Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <img src={leadData.avatar} alt={leadData.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                <Briefcase size={16} className="text-gray-400" /> {lead.job_title}
                            </span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span className="flex items-center gap-1.5">
                                <Building2 size={16} className="text-gray-400" /> {lead.company}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 lg:border-l lg:border-gray-100 lg:pl-6 w-full lg:w-auto">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setStatusOpen(!statusOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border shadow-sm ${getStatusStyle(leadStatus)}`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${currentStatus?.color}`}
                            />

                            {currentStatus?.label}

                            <ChevronDown size={16} />
                        </button>

                        {statusOpen && (
                            <div className="absolute z-50 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1">
                                {statuses.map((status) => (
                                    <button
                                        key={status.value}
                                        type="button"
                                        onClick={() => {
                                            setLeadStatus(status.value);
                                            setStatusOpen(false);

                                            setHistory([
                                                {
                                                    id: Date.now(),
                                                    type: "status",
                                                    title: `Lead status changed to ${status.value}`,
                                                    date: getFormattedNow(),
                                                    user: "You",
                                                },
                                                ...history,
                                            ]);
                                        }}
                                        className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${status.color}`}
                                        />

                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200">
                            <Mail size={16} /> Email
                        </button>
                        <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-transparent hover:border-emerald-200">
                            <Phone size={16} /> Call
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT COLUMN: Activity & Notes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Clock size={18} className="text-indigo-500" /> Activity Center
                            </h3>
                        </div>
                        
                        <div className="p-6">
                            
                            {/* Tabbed Input Box */}
                            <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all shadow-sm">
                                <div className="flex items-center bg-gray-50 border-b border-gray-200">
                                    <button onClick={() => setActionTab('note')} className={`flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${actionTab === 'note' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                                        <Edit2 size={14}/> Log Note
                                    </button>
                                    <button onClick={() => setActionTab('meeting')} className={`flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 border-l border-gray-200 ${actionTab === 'meeting' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                                        <CalendarPlus size={14}/> Meeting
                                    </button>
                                    <button onClick={() => setActionTab('followup')} className={`flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 border-l border-gray-200 ${actionTab === 'followup' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                                        <AlertCircle size={14}/> Follow-up
                                    </button>
                                </div>

                                <ActivityForm actionTab={actionTab} leadId={id!}/>
                            </div>

                            {/* Timeline */}
                            <ActivityList id={id!}/>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Meta Information & Upcoming */}
                <div className="space-y-6">
                    
                    {/* UPCOMING ACTIVITIES CARD */}
                    <UpcomingAction id={id!}/>

                    {/* Insights Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Lead Insights</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Estimated Value</p>
                                <p className="text-2xl font-bold text-emerald-600">{leadData.value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Contact Details</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail size={16} className="text-gray-400 mt-0.5" />
                                <div><p className="font-medium text-gray-900">{leadData.email}</p></div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={16} className="text-gray-400 mt-0.5" />
                                <div><p className="font-medium text-gray-900">{leadData.phone}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}