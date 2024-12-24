import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import Paper from "@/components/frames/papes"
import { SidebarNavigator } from "@/constants/navigator"
import AddNewTenderContent from "@/contents/tender/new-tender/new-tender"
import DashboardLayout from "@/layouts/dashboard-layout"

export default function AddNewTender() {
    const bcItems = [
        {label: SidebarNavigator[1].name, path: "/tender"},
        {label: "New Tender"}
    ] as BreadcrumbItem[]
    
    return (
        <DashboardLayout sideNavIndex={1} bcItems={bcItems}>
            <Paper>
                <AddNewTenderContent />
            </Paper>
        </DashboardLayout>
    )
}