'use client'

import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { useState } from "react";
import { SidebarNavigator } from "@/constants/navigator";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb";

interface LayoutProps {
    sideNavIndex: number;
    children?: ReactNode;
    bcItems: BreadcrumbItem[]
    onClickBC?: Function;
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
                    <Breadcrumb items={layoutProps.bcItems} onClick={layoutProps.onClickBC} />
                </div>
                {/* Main Content */}
                <div className="mx-6 mb-10">
                    {layoutProps.children}
                </div>
            </div>
        </div>
    )
}