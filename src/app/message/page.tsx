'use client'
import DashboardLayout from "@/layouts/dashboard-layout"
import MessageTable from "@/contents/message/message-tables/message-table"
import MessageDatas from "@/constants/message-data"
import { useState } from "react"
import Paper from "@/components/frames/papes"

export default function Message(){
    const [messageDatas, setMessageDatas] = useState(MessageDatas)
    const headers = ["Message"]
    const columns = ["message", "isRead"]
    function onSetMessage(data: any){
        console.log("hmmmm")
        setMessageDatas(data)
    }
    return(
        <DashboardLayout sideNavIndex={2}>
            <Paper className="mb-4 max-md:overflow-x-auto">
                <MessageTable headers={headers} columns={columns} datas={messageDatas} setMessageDatas={onSetMessage} />
            </Paper>
        </DashboardLayout>
        
    )
}