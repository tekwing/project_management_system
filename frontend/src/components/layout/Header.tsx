
type HeaderProps = {
    collapsed: boolean;
    onToggle: () => void;
};

export default function Header({
        collapsed,
        onToggle,
    }: HeaderProps){
    return(
        <header className="flex items-center justify-between h-16 px-6 border-b bg-white">
            {/* Left Section */}
            <button onClick={onToggle}>
                ☰
            </button>
            
            <div className="text-lg font-semibold">
                Company Name
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <button>
                    Notification Icon
                </button>

                <button>
                    Profile Icon
                </button>
            </div>
        </header>
    )
    
}
