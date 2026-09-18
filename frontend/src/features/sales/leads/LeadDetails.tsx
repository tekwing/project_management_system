import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ArrowLeft, Mail, Phone, Building2,Briefcase, 
    Edit2, Trash2, Clock, CheckCircle2, PhoneCall, User, Calendar, 
    CalendarPlus, Video, AlertCircle, ChevronDown, Check, FileText, X
} from "lucide-react";

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

// Initial state for upcoming activities
const initialUpcoming = [
    {
        id: 1,
        type: "meeting",
        title: "Product Demo & Pricing Sync",
        date: "2026-09-22",
        time: "14:00",
        platform: "Zoom Video",
    },
    {
        id: 2,
        type: "followup",
        title: "Follow up on security review",
        date: "2026-09-25",
        time: "09:00",
    }
];

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
    const navigate = useNavigate();
    const [leadStatus, setLeadStatus] = useState(leadData.status);
    
    // Core Data States
    const [upcoming, setUpcoming] = useState(initialUpcoming);
    const [history, setHistory] = useState(initialHistory);
    
    // Tab & Input States
    const [actionTab, setActionTab] = useState<'note' | 'meeting' | 'followup'>('note');
    const [noteText, setNoteText] = useState("");
    
    // Meeting States
    const [meetTitle, setMeetTitle] = useState("");
    const [meetDate, setMeetDate] = useState("");
    const [meetTime, setMeetTime] = useState("");
    
    // Follow-up States
    const [followDate, setFollowDate] = useState("");
    const [followTime, setFollowTime] = useState(""); // NEW TIME STATE
    const [followType, setFollowType] = useState("Call");

    // Modal States for Completing an Activity
    const [completingActivityId, setCompletingActivityId] = useState<number | null>(null);
    const [completionNote, setCompletionNote] = useState("");

    // Date formatting helpers
    const getFormattedNow = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
               " at " + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const getCalendarDateParts = (dateString: string) => {
        if (!dateString) return { month: 'TBD', day: '--' };
        // Adding timezone offset handling so it doesn't shift days
        const d = new Date(dateString + 'T00:00:00');
        return {
            month: d.toLocaleDateString('en-US', { month: 'short' }),
            day: d.toLocaleDateString('en-US', { day: 'numeric' })
        };
    };

    // Formats HTML time input (e.g. "14:30") to "2:30 PM"
    const formatTime12Hour = (time24h: string) => {
        if (!time24h) return "";
        const [hourString, minute] = time24h.split(":");
        const hour = parseInt(hourString, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute} ${ampm}`;
    };

    // ==========================================
    // ACTION HANDLERS
    // ==========================================

    const handleActionSubmit = () => {
        if (actionTab === 'note' && noteText.trim()) {
            setHistory([{
                id: Date.now(),
                type: "note",
                title: "Logged a note",
                date: getFormattedNow(),
                user: "You",
                note: noteText.trim()
            }, ...history]);
            setNoteText("");
        } 
        else if (actionTab === 'meeting' && meetTitle.trim() && meetDate) {
            setUpcoming([...upcoming, {
                id: Date.now(),
                type: "meeting",
                title: meetTitle.trim(),
                date: meetDate,
                time: meetTime,
                platform: "Scheduled Meeting"
            }]);
            setMeetTitle(""); setMeetDate(""); setMeetTime(""); setNoteText("");
            setActionTab('note');
        }
        else if (actionTab === 'followup' && followDate) {
            setUpcoming([...upcoming, {
                id: Date.now(),
                type: "followup",
                title: `Follow-up: ${followType}${noteText ? ` - ${noteText}` : ''}`,
                date: followDate,
                time: followTime, // Pass the new time here
            }]);
            setFollowDate(""); setFollowTime(""); setNoteText(""); // Clear state
            setActionTab('note');
        }
    };

    const openCompletionModal = (id: number) => {
        setCompletingActivityId(id);
        setCompletionNote("");
    };

    const submitCompletion = () => {
        if (!completingActivityId) return;
        const itemToComplete = upcoming.find(x => x.id === completingActivityId);
        if (!itemToComplete) return;

        setUpcoming(upcoming.filter(x => x.id !== completingActivityId));
        setHistory([{
            id: Date.now(),
            type: itemToComplete.type,
            title: `Completed ${itemToComplete.type === 'meeting' ? 'Meeting' : 'Follow-up'}: ${itemToComplete.title}`,
            date: getFormattedNow(),
            user: "You",
            note: completionNote.trim() || undefined
        }, ...history]);

        setCompletingActivityId(null);
        setCompletionNote("");
    };

    // ==========================================
    // UI HELPERS
    // ==========================================

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
            case "Contacted": return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
            case "Qualified": return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
            case "Lost": return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
            default: return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
        }
    };

    const getActivityConfig = (type: string) => {
        switch(type) {
            case "email": return { icon: Mail, color: "text-blue-500", bg: "bg-blue-50" };
            case "call": return { icon: PhoneCall, color: "text-emerald-500", bg: "bg-emerald-50" };
            case "status": return { icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-50" };
            case "meeting": return { icon: Video, color: "text-purple-500", bg: "bg-purple-50" };
            case "followup": return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" };
            case "note": return { icon: FileText, color: "text-gray-600", bg: "bg-gray-100" };
            default: return { icon: User, color: "text-gray-500", bg: "bg-gray-100" };
        }
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">{leadData.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                <Briefcase size={16} className="text-gray-400" /> {leadData.title}
                            </span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span className="flex items-center gap-1.5">
                                <Building2 size={16} className="text-gray-400" /> {leadData.company}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 lg:border-l lg:border-gray-100 lg:pl-6 w-full lg:w-auto">
                    <div className="relative inline-flex items-center group w-full sm:w-auto">
                        <select
                            value={leadStatus}
                            onChange={(e) => {
                                setLeadStatus(e.target.value);
                                setHistory([{
                                    id: Date.now(),
                                    type: "status",
                                    title: `Lead status changed to ${e.target.value}`,
                                    date: getFormattedNow(),
                                    user: "You"
                                }, ...history]);
                            }}
                            className={`appearance-none cursor-pointer w-full sm:w-auto pr-9 pl-4 py-2.5 rounded-lg text-sm font-semibold border outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm ${getStatusStyle(leadStatus)}`}
                        >
                            <option value="New">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>
                        <div className="absolute right-3 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
                            <ChevronDown size={16} />
                        </div>
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

                                <div className="p-3">
                                    {/* Meeting Form */}
                                    {actionTab === 'meeting' && (
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <input value={meetTitle} onChange={e=>setMeetTitle(e.target.value)} type="text" placeholder="Meeting Title..." className="col-span-2 text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                                            <input value={meetDate} onChange={e=>setMeetDate(e.target.value)} type="date" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                                            <input value={meetTime} onChange={e=>setMeetTime(e.target.value)} type="time" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                                        </div>
                                    )}

                                    {/* Follow-up Form */}
                                    {actionTab === 'followup' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                                            <input value={followDate} onChange={e=>setFollowDate(e.target.value)} type="date" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                                            <input value={followTime} onChange={e=>setFollowTime(e.target.value)} type="time" className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all" />
                                            <select value={followType} onChange={e=>setFollowType(e.target.value)} className="text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all">
                                                <option value="Call">Call</option>
                                                <option value="Email">Email</option>
                                                <option value="LinkedIn Message">LinkedIn Message</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* Main Note Text Area */}
                                    <textarea 
                                        value={noteText}
                                        onChange={e => setNoteText(e.target.value)}
                                        placeholder={
                                            actionTab === 'note' ? "Start typing to log a note..." : 
                                            actionTab === 'meeting' ? "Meeting agenda or description (optional)..." : 
                                            "What needs to be done? (optional)"
                                        } 
                                        className="w-full text-sm outline-none resize-y min-h-15 p-2 bg-transparent"
                                    />
                                    
                                    {/* Submit Action */}
                                    <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
                                        <button 
                                            onClick={handleActionSubmit} 
                                            disabled={(actionTab === 'note' && !noteText.trim()) || (actionTab === 'meeting' && (!meetTitle || !meetDate)) || (actionTab === 'followup' && !followDate)}
                                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                                        >
                                            {actionTab === 'note' ? 'Save Note' : actionTab === 'meeting' ? 'Schedule Meeting' : 'Set Follow-up'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="relative border-l-2 border-gray-100 ml-5 space-y-8 pb-4">
                                {history.map((activity) => {
                                    const config = getActivityConfig(activity.type);
                                    const Icon = config.icon;
                                    
                                    return (
                                        <div key={activity.id} className="relative pl-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <div className={`absolute -left-4.25 top-0.5 w-8 h-8 rounded-full ring-4 ring-white flex items-center justify-center ${config.bg} ${config.color}`}>
                                                <Icon size={14} />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                                    <span className="font-medium text-gray-900 text-sm">{activity.title}</span>
                                                    <span className="text-gray-300 hidden sm:inline">•</span>
                                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                                </div>
                                                <p className="text-xs font-medium text-gray-500 mb-2">By {activity.user}</p>
                                                
                                                {activity.note && (
                                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                                                        {activity.note}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Meta Information & Upcoming */}
                <div className="space-y-6">
                    
                    {/* UPCOMING ACTIVITIES CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-hidden">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Calendar size={16} className="text-indigo-500"/> Upcoming Actions
                            </h3>
                            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-md">
                                {upcoming.length}
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {upcoming.length > 0 ? upcoming.map((act) => {
                                const dateParts = getCalendarDateParts(act.date);
                                return (
                                    <div key={act.id} className="flex gap-3 group relative bg-white border border-gray-100 hover:border-indigo-200 p-3 rounded-xl transition-all shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
                                        <div className={`shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${act.type === 'meeting' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                                            <span className="text-[10px] font-bold uppercase leading-none mb-0.5">{dateParts.month}</span>
                                            <span className="text-lg font-black leading-none">{dateParts.day}</span>
                                        </div>
                                        <div className="pt-0.5 grow pr-8">
                                            <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors cursor-pointer">{act.title}</p>
                                            <div className="flex flex-col gap-0.5 mt-1.5">
                                                {act.time && <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock size={12}/> {formatTime12Hour(act.time) || "Anytime"}</span>}
                                                {act.platform && <span className="flex items-center gap-1.5 text-xs text-gray-500"><Video size={12}/> {act.platform}</span>}
                                            </div>
                                        </div>

                                        {/* MARK AS DONE BUTTON */}
                                        <button 
                                            onClick={() => openCompletionModal(act.id)}
                                            title="Log Outcome"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-400 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        >
                                            <Check size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                )
                            }) : (
                                <p className="text-sm text-gray-500 italic text-center py-4">No upcoming actions scheduled.</p>
                            )}
                        </div>
                    </div>

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

            {/* COMPLETION MODAL */}
            {completingActivityId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Log Outcome</h3>
                            <button onClick={() => setCompletingActivityId(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        
                        <div className="p-5">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Meeting / Follow-up Notes
                            </label>
                            <textarea
                                autoFocus
                                value={completionNote}
                                onChange={(e) => setCompletionNote(e.target.value)}
                                placeholder="What was the outcome? Any next steps?"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-30 resize-y"
                            />
                        </div>
                        
                        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setCompletingActivityId(null)} 
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={submitCompletion} 
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                Mark as Done & Log
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}