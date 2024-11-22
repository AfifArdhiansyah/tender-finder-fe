'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigator } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import Paper from "@/components/frames/papes"
import TenderDetailContent from "@/contents/tender/tender-details/tender-detail";
import { useParams } from 'next/navigation';

export default function TenderDetail(){
    const { id } = useParams();
    const bcItems = [
        {label: SidebarNavigator[1].name, path: "/tender"},
        {label: "Detail Tender"}
    ] as BreadcrumbItem[]
    return(
        <DashboardLayout sideNavIndex={1} bcItems={bcItems}>
            <Paper>
                <TenderDetailContent idTender={id as string}/>
            </Paper>
        </DashboardLayout>
    )
}