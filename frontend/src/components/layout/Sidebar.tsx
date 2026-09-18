import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    Users,
    UsersRound,
    Circle,
    ChevronDown,
    ChevronRight,
    Handshake 
} from "lucide-react";

type SidebarProps = {
    collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {
    // Optional: useLocation can be used to highlight the active route
    // const location = useLocation();

    const menu = [
        {
            title: 'Dashboard',
            path: '/',
            icon: LayoutDashboard
        },
        {
            title: 'Project',
            icon: FolderKanban,
            children: [
                { title: 'Add New Project', path: '/projects/add' },
                { title: 'All Projects', path: '/projects' }
            ]
        },
        {
            title: 'Team',
            icon: UsersRound,
            children: [
                { title: 'Add Member', path: '/members/add' },
                { title: 'All Members', path: '/members' }
            ]
        },
        {
            title: 'Task',
            icon: ListTodo,
            children: [
                { title: 'Add New Task', path: '/tasks/add' },
                { title: 'All Tasks', path: '/tasks' }
            ]
        },
        {
            title: 'Users',
            icon: Users,
            children: [
                { title: 'Add New User', path: '/users/add' },
                { title: 'All Users', path: '/users' }
            ]
        },
        {
            title: 'Sales',
            icon: Handshake ,
            children: [
                { title: 'Add New Lead', path: 'sales/lead/add' },
                { title: 'All Leads', path: 'sales/leads' },
                { title: 'PipeLine', path: 'sales/pipeline'}
            ]
        },
    ];

    const [dropdownAction, setDropdownAction] = useState<string | null>(null);
    const [hoverMenu, setHoverMenu] = useState<string | null>(null);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (
        <aside className={`flex flex-col min-h-screen bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 z-40 ${collapsed ? "w-20" : "w-64"}`}>
            
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-center border-b border-slate-800 mb-4 px-4">
                {collapsed ? (
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/10 rounded-xl text-indigo-400">
                        <ListTodo size={24} />
                    </div>
                ) : (
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-lg text-white">
                            <ListTodo size={18} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wide">TaskFlow</span>
                    </div>
                )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-3 space-y-1">
                {menu.map((item) => {
                    const isExpanded = dropdownAction === item.title;
                    const isHovered = collapsed && hoverMenu === item.title;

                    // 1. Single Link Items (No Children)
                    if (item.path) {
                        return (
                            <Link 
                                key={item.title} 
                                to={item.path}
                                className={`flex items-center rounded-lg cursor-pointer transition-all duration-200 group ${
                                    collapsed ? "justify-center p-3" : "px-3 py-2.5 gap-3"
                                } hover:bg-slate-800 hover:text-white`}
                            >
                                <item.icon size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                {!collapsed && <span className="font-medium text-sm">{item.title}</span>}
                            </Link>
                        );
                    }

                    // 2. Dropdown Menu Items (Has Children)
                    return (
                        <div 
                            key={item.title} 
                            className="relative"
                            onMouseEnter={() => {
                                if (hoverTimer.current) clearTimeout(hoverTimer.current);
                                if (collapsed) setHoverMenu(item.title);
                            }}
                            onMouseLeave={() => {
                                if (collapsed) {
                                    hoverTimer.current = setTimeout(() => setHoverMenu(null), 200);
                                }
                            }}
                        >
                            {/* Main Trigger Button */}
                            <div
                                onClick={() => !collapsed && setDropdownAction(isExpanded ? null : item.title)}
                                className={`flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200 group ${
                                    collapsed ? "justify-center p-3" : "px-3 py-2.5"
                                } hover:bg-slate-800 hover:text-white ${isExpanded && !collapsed ? "bg-slate-800 text-white" : ""}`}
                            >
                                <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                                    <item.icon size={20} className={`transition-colors ${isExpanded && !collapsed ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-400"}`} />
                                    {!collapsed && <span className="font-medium text-sm">{item.title}</span>}
                                </div>
                                
                                {/* Chevron indicator (only visible when expanded) */}
                                {!collapsed && (
                                    <ChevronDown 
                                        size={16} 
                                        className={`text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                                    />
                                )}
                            </div>

                            {/* Expanded Accordion Menu (when Sidebar is OPEN) */}
                            {!collapsed && (
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                    <ul className="relative ml-5 pl-4 border-l border-slate-700 space-y-1">
                                        {item.children?.map((child) => (
                                            <li key={child.title}>
                                                <Link 
                                                    to={child.path}
                                                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors group"
                                                >
                                                    <Circle size={6} className="text-slate-500 group-hover:text-indigo-400 transition-colors" fill="currentColor" />
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Popout Tooltip Menu (when Sidebar is COLLAPSED) */}
                            {collapsed && isHovered && (
                                <div className="absolute left-full top-0 ml-4 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-2 animate-in fade-in slide-in-from-left-2 duration-200">
                                    {/* Small pointing triangle */}
                                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-slate-800 border-l border-b border-slate-700 rotate-45"></div>
                                    
                                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 border-b border-slate-700/50">
                                        {item.title}
                                    </div>
                                    <ul>
                                        {item.children?.map((child) => (
                                            <li key={child.title}>
                                                <Link 
                                                    to={child.path}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                                >
                                                    <ChevronRight size={14} className="text-indigo-400" />
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}