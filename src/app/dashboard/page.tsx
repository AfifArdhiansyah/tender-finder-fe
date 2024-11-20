import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"

export default function Dashboard(){
    return(
        <DashboardLayout sideNavIndex={0}>
            <div className="flex flex-col gap-2">
                <Paper className="">
                    <p>ini dasboard data</p>
                </Paper>
                <Paper className="">
                    <p>ini dasboard data</p>
                </Paper>
            </div>
        </DashboardLayout>
        
    )
}