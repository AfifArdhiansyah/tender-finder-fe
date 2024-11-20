import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"
import SummaryContent from "@/contents/summary/summary-content"

export default function Dashboard(){
    return(
        <DashboardLayout sideNavIndex={0}>
            <div className="flex flex-col gap-4">
                <Paper className="">
                    <SummaryContent/>
                </Paper>
                <Paper className="">
                    <p>ini dasboard data</p>
                </Paper>
            </div>
        </DashboardLayout>
        
    )
}