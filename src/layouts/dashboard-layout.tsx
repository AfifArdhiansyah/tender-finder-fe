'use client'

import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb";
import Head from "next/head";

interface LayoutProps {
    sideNavIndex: number;
    children?: ReactNode;
    bcItems: BreadcrumbItem[]
    onClickBC?: Function;
    role?: string
}

export default function DashboardLayout(layoutProps: LayoutProps){
    const [indexList, setIndexList] = useState(layoutProps.sideNavIndex)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);
    useEffect(() => {
        document.title = layoutProps.bcItems[layoutProps.bcItems.length-1].label + " - bjb Tender Finder";
    }, []);
    
    return(
        <div className="flex gap-1 min-h-screen primary-bg">
            <Head>
                <title>{document.title}</title>
            </Head>
            {/* Sidebar */}
            <div className="bg-white min-w-fit">
                <Sidebar indexNav={indexList} setIndexList={setIndexList} isSidebarOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen}/>
            </div>
            <div className="flex flex-col gap-6 w-full">
                {/* Navbar */}
                <Navbar toggleSidebar={()=>toggleSidebar}/>
                <div className="mx-6 flex gap-2 max-md:mx-4">
                    <div className="w-[4px] h-full blue-bg"></div>
                    <Breadcrumb items={layoutProps.bcItems} onClick={layoutProps.onClickBC} />
                </div>
                {/* Main Content */}
                <div className="mx-6 mb-10 h-full max-md:mx-4">
                    {layoutProps.children}
                </div>
            </div>
        </div>
    )
}