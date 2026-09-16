import React from "react";

// Types Definitions
type ReviewProps = {
    data: any;
};

interface ReviewSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

interface ReviewItemProps {
    label: string;
    value: any;
    className?: string;
    isLink?: boolean;
    isStatus?: boolean;
}

function ReviewStep({ data }: ReviewProps) {
    return (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full space-y-8">
            {/* Header Section */}
            <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Review Project</h1>
                <p className="text-sm text-slate-500 mt-1">Carefully verify all configurations before launching the workspace environment.</p>
            </div>

            <div className="space-y-6">
                {/* Basic Information */}
                <ReviewSection title="Basic Information" icon={
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>
                }>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ReviewItem label="Project Name" value={data.name} />
                        <ReviewItem label="Project Code" value={data.project_code} />
                        <ReviewItem label="Project Type" value={data.project_type} />
                        <ReviewItem label="Category" value={data.category} />
                        <ReviewItem label="Description" value={data.description} className="md:col-span-2 lg:col-span-3" />
                    </div>
                </ReviewSection>

                {/* Team Setup */}
                <ReviewSection title="Team & Access" icon={
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                }>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ReviewItem label="Project Manager" value={data.projectManager} />
                        <ReviewItem label="Project Lead" value={data.projectLead} />
                        <ReviewItem 
                            label="Team Roster" 
                            value={data.members?.length ? data.members.map((m: any) => `${m.name} (${m.role})`).join(", ") : null} 
                            className="md:col-span-2 lg:col-span-1"
                        />
                    </div>
                </ReviewSection>

                {/* Timeline Grid */}
                <ReviewSection title="Timeline & Delivery" icon={
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>
                }>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <ReviewItem label="Start Date" value={data.startDate} />
                        <ReviewItem label="Due Date" value={data.dueDate} />
                        <ReviewItem label="Estimated Duration" value={data.estimated_duration} />
                        <ReviewItem label="Timezone" value={data.timezone} />
                        <ReviewItem 
                            label="Milestones" 
                            value={data.milestones?.length ? data.milestones.join(", ") : null} 
                            className="md:col-span-2 lg:col-span-4" 
                        />
                    </div>
                </ReviewSection>

                {/* Resources */}
                <ReviewSection title="Resources & Codebases" icon={
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 018.716 6.747M12 3a9.004 9.004 0 00-8.716 6.747M10.25 9.75l-1.5 1.5 1.5 1.5m3.5 0l1.5-1.5-1.5-1.5M12 8.25v7.5"/></svg>
                }>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ReviewItem 
                            label="Budget" 
                            value={data.budget ? `$${Number(data.budget).toLocaleString()}` : null} 
                        />
                        <ReviewItem label="Repository URL" value={data.repositoryUrl} isLink />
                        <ReviewItem label="Documentation URL" value={data.documentationUrl} isLink />
                        <ReviewItem label="Brief Attachments" value={data.attachments} className="md:col-span-2 lg:col-span-3" />
                    </div>
                </ReviewSection>

                {/* Settings Configuration */}
                <ReviewSection title="Settings & Toggles" icon={
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767a1.123 1.123 0 00-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 00.417 1.03l1.003.767c.379.29.507.82.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456a1.125 1.125 0 00-1.075.124c-.073.044-.146.087-.22.128-.332.183-.582.495-.645.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.646-.87c-.074-.041-.148-.084-.22-.128a1.125 1.125 0 00-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.43l1.002-.767a1.122 1.122 0 00.418-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 00-.418-1.03l-1.002-.767a1.125 1.125 0 01-.26-1.43l1.296-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.646-.869l.214-1.28z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                }>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        <ReviewItem label="Visibility" value={data.visibility} />
                        <ReviewItem label="Priority" value={data.priority} />
                        <ReviewItem label="Default Status" value={data.defaultStatus} />
                        <ReviewItem label="Project Color" value={data.projectColor} />
                        <ReviewItem label="Time Tracking" value={data.enableTimeTracking ? "Enabled" : "Disabled"} isStatus />
                        <ReviewItem label="Notifications" value={data.enableNotifications ? "Enabled" : "Disabled"} isStatus />
                        <ReviewItem label="Guest Members" value={data.allowGuestMembers ? "Allowed" : "Not Allowed"} isStatus />
                        <ReviewItem label="Auto Archive" value={data.autoArchiveCompletedTasks ? "Enabled" : "Disabled"} isStatus />
                    </div>
                </ReviewSection>
            </div>
        </div>
    );
}

// ========================================================
// 💡 SUB-COMPONENTS PLACED OUTSIDE THE COMPONENT SCOPE
// ========================================================

function ReviewSection({ title, icon, children }: ReviewSectionProps) {
    return (
        <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-5 transition hover:shadow-2xs">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200/60 pb-2">
                {icon}
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function ReviewItem({ label, value, className = "", isLink = false, isStatus = false }: ReviewItemProps) {
    const hasValue = value !== null && value !== undefined && String(value).trim() !== "";
    
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
            
            {!hasValue ? (
                <span className="text-sm text-slate-300 italic select-none">Not specified</span>
            ) : isLink ? (
                <a 
                    href={String(value)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline truncate inline-flex items-center gap-1"
                >
                    {value}
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
                </a>
            ) : isStatus ? (
                <div>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border ${
                        value === "Enabled" || value === "Allowed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                        {value}
                    </span>
                </div>
            ) : (
                <span className="text-sm font-semibold text-slate-700 capitalize tracking-tight">{value}</span>
            )}
        </div>
    );
}

export default ReviewStep;