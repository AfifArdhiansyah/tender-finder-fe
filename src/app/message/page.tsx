'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import MessageTable from "@/contents/message/message-tables/message-table"
import MessageDatas from "@/constants/message-data"
import { useState } from "react"
import Paper from "@/components/frames/papes"
import { SidebarNavigator } from "@/constants/navigator"
import { useMessage } from "@/hooks/useMessage"

export default function Message(){
    const index = 2
    // const [messageDatas, setMessageDatas] = useState(MessageDatas)
    const { messages, refresh, loading, error } = useMessage()
    const headers = ["Message", ""]
    const columns = ["message", "is_read"]
    // function onSetMessage(data: any){
    //     setMessageDatas(data)
    // }
    const breadcrumbItems = [{ label: SidebarNavigator[index].name, state: "pusat"}]
    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems}>
            <Paper className="mb-4 max-md:overflow-x-auto">
                <MessageTable headers={headers} columns={columns} datas={messages} />
            </Paper>
        </DashboardLayout>
        
    )
}