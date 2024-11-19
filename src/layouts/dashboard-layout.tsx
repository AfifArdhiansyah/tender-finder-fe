'use client'

import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { useState } from "react";
import { SidebarNavigator } from "@/constants/navigator";

interface LayoutProps {
    sideNavIndex: number,
    children: ReactNode;
}

export default function DashboardLayout(layoutProps: LayoutProps){
    const [indexList, setIndexList] = useState(layoutProps.sideNavIndex)
    return(
        <div className="flex gap-1 min-h-screen primary-bg">
            {/* Sidebar */}
            <div className="bg-white min-w-fit max-md:hidden">
                <Sidebar indexNav={indexList} setIndexList={setIndexList}/>
            </div>
            <div className="flex flex-col gap-6 w-full">
                {/* Navbar */}
                <Navbar/>
                <div className="px-6 flex gap-2">
                    <div className="w-[4px] h-full blue-bg"></div>
                    <h2 className="font-bold text-lg max-md:text-md">{SidebarNavigator[indexList].name}</h2>
                </div>
                {/* Main Content */}
                <div className="rounded-md bg-white mx-6 p-4 max-md:overflow-x-auto">
                    {layoutProps.children}
                </div>
            </div>
        </div>
    )
}