import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    Users,
    ChevronDown,
    Circle 
} from "lucide-react";

type SidebarProps = {
    collapsed: boolean;
};

export default function Sidebar({
        collapsed,
    }: SidebarProps) {
        
    const menu= [
        {
            title:'Dashboard',
            path: '/',
            icon: LayoutDashboard
        },
        {
            title:'Project',
            icon: FolderKanban,
            children:[
                {
                    title:'Add New Project',
                    path:'/projects/add'
                },
                {
                    title:'All Project',
                    path:'/projects'
                }
            ]
        },
        {
            title:'Task',
            icon: ListTodo,
            children:[
                {
                    title:'Add New Task',
                    path:''
                },
                {
                    title:'All Tasks',
                    path:''
                }
            ]
        },
        {
            title:'Users',
            icon: Users,
            children:[
                {
                    title:'Add New User',
                    path:''
                },
                {
                    title:'All Users',
                    path:''
                }
            ]
        },
    ];

    const [dropdownAction, setDropdownAction] = useState<string | null>(null);

    const [hoverMenu, setHoverMenu] = useState<string | null>(null);

    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (
        <aside className={`${collapsed ? "w-20" : "w-64"} bg-gray-900 text-white p-4 transition-all duration-300`}>
            {collapsed &&(
                <div className="mb-10 flex items-center justify-center"><ListTodo size={20} /></div>
            )}
            {!collapsed &&(
                <div className="h-20 flex items-center ">TaskFlow</div>
            )}
            
            <nav>
                <ul className="space-y-4">

                    {menu.map((item)=>{
                        if(item.path){
                            return(
                                <li key={item.title} className="hover:text-blue-400 cursor-pointer">
                                    <Link to={item.path}>
                                        <div  className={`flex items-center ${
                                                collapsed ? "justify-center" : "gap-3"
                                            }`}>
                                            {item.icon && <item.icon size={20} />}
                                            {!collapsed && item.title}
                                        </div>
                                    </Link >
                                </li>
                            )
                        }else{
                            return(
                                <li key={item.title} className="relative" 
                                    onMouseEnter={() => {
                                        if (hoverTimer.current) {
                                            clearTimeout(hoverTimer.current);
                                        }

                                        if (collapsed) {
                                            setHoverMenu(item.title);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (collapsed) {
                                            hoverTimer.current = setTimeout(() => {
                                                setHoverMenu(null);
                                            }, 200);
                                        }
                                    }}>
                                    <div
                                        onClick={() =>
                                            setDropdownAction(
                                                dropdownAction === item.title
                                                ? null
                                                : item.title
                                            )
                                        }
                                        className="hover:text-blue-400 cursor-pointer"
                                    >
                                        <div  className={`flex items-center ${
                                                collapsed ? "justify-center" : "gap-3"
                                            }`}>
                                            {item.icon && <item.icon size={20} />}
                                            {!collapsed && item.title}
                                        </div>
                                        
                                    </div>

                                    {item.children && (
                                        <>
                                            {!collapsed && (
                                                <ul
                                                    className={`ml-12 space-y-2 text-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
                                                        dropdownAction === item.title
                                                            ? "max-h-40 opacity-100 mt-2"
                                                            : "max-h-0 opacity-0"
                                                    }`}
                                                    >
                                                    {item.children?.map((child) => (
                                                        <li key={child.title}>
                                                            <Link className="flex items-center gap-2" to={child.path}>
                                                                <Circle size={6} fill="currentColor" />
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {collapsed && hoverMenu === item.title && (
                                                <ul className="
                                                        absolute
                                                        left-16
                                                        top-0
                                                        w-48
                                                        bg-gray-800
                                                        rounded
                                                        p-3
                                                        space-y-2
                                                        text-gray-300
                                                        shadow-lg
                                                        z-50
                                                    "
                                                    >
                                                    {item.children?.map((child) => (
                                                        <li key={child.title}>
                                                            <Link className="hover:text-blue-400" to={child.path}>
                                                                
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </li>
                            )   
                        }      
                    })}
                </ul>
            </nav>
        </aside>
    );
}