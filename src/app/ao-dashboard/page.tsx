'use client'

import { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"
import SummaryContent from "@/contents/summary/summary-content"
import { SidebarNavigatorAO } from "@/constants/navigator";

export default function DashboardAO(){
    const index = 0;
    const [breadcrumbItems] = useState(
        [
            { label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref}
        ]
    );
    const [currState] = useState("AO")
    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems} role="ao">
            <div className="flex flex-col gap-4 h-full">
                <Paper className="">
                    <SummaryContent title={currState} stateIndex={3} officeId={0}/>
                </Paper>
            </div>
        </DashboardLayout>
    )
}