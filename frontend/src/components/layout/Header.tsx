import { Menu, Bell, Search, PanelLeft } from 'lucide-react';

type HeaderProps = {
    collapsed: boolean;
    onToggle: () => void;
};

export default function Header({
    collapsed,
    onToggle,
}: HeaderProps) {
    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
            
            {/* Left Section: Menu Toggle & Brand */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onToggle}
                    aria-label="Toggle Sidebar"
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {/* Switch icon based on collapsed state */}
                    {collapsed ? <Menu size={20} /> : <PanelLeft size={20} />}
                </button>
                
                {/* Brand Logo / Name */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
                        <span className="text-white font-bold text-lg leading-none">Q</span>
                    </div>
                    {/* Hidden on very small mobile screens, visible on small+ */}
                    <span className="text-xl font-bold text-gray-900 hidden sm:block">
                        Quantum
                    </span>
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-3 sm:gap-5">
                
                {/* Global Search Icon (Optional, common in headers) */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                    <Search size={20} />
                </button>

                {/* Notification Bell with Badge */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    {/* Unread notification indicator (the little red dot) */}
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 p-1 pr-2 hover:bg-gray-50 rounded-full sm:rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {/* Using a placeholder avatar service */}
                    <img 
                        src="https://ui-avatars.com/api/?name=Admin+User&background=e0e7ff&color=4f46e5" 
                        alt="User Profile" 
                        className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                    />
                    <div className="hidden sm:flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-700 leading-none">Admin User</span>
                        <span className="text-xs text-gray-500 mt-1 leading-none">Workspace Owner</span>
                    </div>
                </button>
                
            </div>
        </header>
    );
}