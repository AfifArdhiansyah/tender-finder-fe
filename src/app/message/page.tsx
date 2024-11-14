import DashboardLayout from "@/layouts/dashboard-layout"
import MessageTable from "@/components/tables/message-tables/message-table"
import MessageDatas from "@/constants/message-data"

export default function Message(){
    const headers = ["Message", ""]
    const columns = ["message", "isRead"]
    return(
        <DashboardLayout sideNavIndex={2}>
            <MessageTable headers={headers} columns={columns} datas={MessageDatas} />
        </DashboardLayout>
        
    )
}