import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function DashboardLayout(layoutProps: LayoutProps){
    return(
        <div className="flex gap-1 min-h-screen primary-bg">
            {/* Sidebar */}
            <div className="bg-white w-[20%]">
                <Sidebar/>
            </div>
            <div className="flex flex-col gap-6 w-[80%]">
                {/* Navbar */}
                <Navbar/>
                <div className="px-6 flex gap-2">
                    <div className="w-[4px] h-full blue-bg"></div>
                    <h2 className="font-bold text-lg">Daftar Tender</h2>
                </div>
                {/* Main Content */}
                <div className="rounded-md bg-white mx-6 py-2 px-4">
                    {layoutProps.children}
                </div>
            </div>
        </div>
    )
}