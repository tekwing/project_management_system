interface Member {
  name: string;
  role: string;
}

interface TeamStepProps {
  data: Record<string, any>;
  updateProjectData: (data: Record<string, any>) => void;
}

function TeamStep({ data, updateProjectData }: TeamStepProps) {
  // Get current members array safely with a fallback empty array
  const currentMembers: Member[] = data.members || [];

  const removeMember = (indexToRemove: number) => {
    updateProjectData({
      members: currentMembers.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full space-y-8">
      {/* Header Section */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Team Details</h1>
        <p className="text-sm text-slate-500 mt-1">Assign leadership roles and build your project team roster.</p>
      </div>

      {/* 👑 SECTION 1: CORE LEADERSHIP (Single Assignments) */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Leadership</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Project Manager Selection */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="project-manager" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Project Manager
            </label>
            <div className="relative w-full">
              <select
                id="project-manager"
                className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
                value={data.projectManager || ""}
                onChange={(e) => updateProjectData({ projectManager: e.target.value })}
              >
                <option value="">Select Project Manager</option>
                <option value="Sarah Jenkins">Sarah Jenkins</option>
                <option value="Michael Chang">Michael Chang</option>
                <option value="Alex Morgan">Alex Morgan</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Project Lead Selection */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="project-lead" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Project Lead
            </label>
            <div className="relative w-full">
              <select
                id="project-lead"
                className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
                value={data.projectLead || ""}
                onChange={(e) => updateProjectData({ projectLead: e.target.value })}
              >
                <option value="">Select Project Lead</option>
                <option value="David Kim">David Kim</option>
                <option value="Emma Watson">Emma Watson</option>
                <option value="Carlos Ruiz">Carlos Ruiz</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 👥 SECTION 2: GENERAL TEAM MEMBERS ROSTER (Dynamic list builder) */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Roster</h3>

        {/* Form Grid Box */}
        <div className="space-y-4 border-slate-100">
            {/* Searchable Picker Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end bg-slate-50/50 p-4 rounded-xl border border-slate-200/60">
                {/* System User Selection Dropdown */}
                <div className="flex flex-col gap-1.5 w-full md:col-span-2">
                <label htmlFor="system-user-select" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Select Teammate from System
                </label>
                <div className="relative w-full">
                    <select
                    id="system-user-select"
                    className="w-full h-10 pl-3 pr-10 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition"
                    value="" // Kept empty so it resets instantly after a choice is clicked
                    onChange={(e) => {
                        const selectedName = e.target.value;
                        if (!selectedName) return;

                        // Mock Data Query logic: Find the user details from your system users list
                        const systemUsers = [
                        { name: "John Doe", role: "Developer" },
                        { name: "Jane Smith", role: "Designer" },
                        { name: "Robert Downey", role: "Developer" },
                        { name: "Emily Watson", role: "Designer" }
                        ];

                        const memberToAdd = systemUsers.find(u => u.name === selectedName);
                        
                        // Check if member exists and isn't already added to the project roster
                        if (memberToAdd && !currentMembers.some(m => m.name === memberToAdd.name)) {
                        updateProjectData({
                            members: [...currentMembers, memberToAdd]
                        });
                        }
                    }}
                    >
                    <option value="">Choose an available member...</option>
                    <option value="John Doe">John Doe (Developer)</option>
                    <option value="Jane Smith">Jane Smith (Designer)</option>
                    <option value="Robert Downey">Robert Downey (Developer)</option>
                    <option value="Emily Watson">Emily Watson (Designer)</option>
                    </select>
                    
                    {/* Dropdown Search / Filter Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    </div>
                </div>
                </div>
            </div>
            </div>

        {/* Roster Display Section */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Current Roster ({currentMembers.length})
          </h3>

          {currentMembers.length === 0 ? (
            /* Empty State */
            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/30">
              <p className="text-sm text-slate-400 italic">No team members added yet. Use the fields above to build your team.</p>
            </div>
          ) : (
            /* Active Member List Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {member.name}
                    </span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                        member.role === 'Developer' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                          : 'bg-purple-50 text-purple-700 border border-purple-100'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Remove Action Button */}
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Remove member"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamStep;