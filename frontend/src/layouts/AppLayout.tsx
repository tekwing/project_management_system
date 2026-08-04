import Header from './../components/layout/Header';
import Sidebar from './../components/layout/Sidebar';
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AppLayout(){
    const [collapsed, setCollapsed] = useState(false);
    console.log("collapsed:", collapsed);
    return(
        <div className="h-screen flex overflow-hidden">
                <Sidebar collapsed={collapsed}/>
                <div className="flex-1 flex flex-col min-w-0">

                    <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}/>

                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                        <Outlet />
                    </main>

                </div>   
        </div>
    )
}