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
            <div className="bg-white w-[17%]">
                <Sidebar indexNav={indexList} setIndexList={setIndexList}/>
            </div>
            <div className="flex flex-col gap-6 w-[83%]">
                {/* Navbar */}
                <Navbar/>
                <div className="px-6 flex gap-2">
                    <div className="w-[4px] h-full blue-bg"></div>
                    <h2 className="font-bold text-lg">{SidebarNavigator[indexList].name}</h2>
                </div>
                {/* Main Content */}
                <div className="rounded-md bg-white mx-6 p-4">
                    {layoutProps.children}
                </div>
            </div>
        </div>
    )
}