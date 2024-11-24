import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigatorAO } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import TenderListAO from "@/contents/tender-ao/tender-list-ao"

export default function AOTender(){
    const index = 1
    const role = 'ao'
    const bcItems = [
        {label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref}
    ] as BreadcrumbItem[]
    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            <div className="flex flex-col gap-4 h-full">
                <TenderListAO/>
            </div>
        </DashboardLayout>
    )
}