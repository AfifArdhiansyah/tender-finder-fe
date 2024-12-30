'use client'

import { useEffect, useState } from "react"
import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigatorAO } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import MessageDatas from "@/constants/message-data"
import MessageListAO from "@/contents/message/message-list-ao/message-list-ao"
import { useMessage } from "@/hooks/useMessage"
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response"
import Paper from "@/components/frames/papes"

export default function AOMessage(){
    const index = 2
    const role = 'ao'
    const bcItems = [
        {label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref}
    ] as BreadcrumbItem[]
    // const [messageDatas, setMessageDatas] = useState(MessageDatas)
    const { messages, refresh, loading, error } = useMessage()
    const [allMessages, setAllMessages] = useState(messages)
    function setMessageRead(index: number){
        const newMessageData = allMessages
        if (newMessageData[index]) {
            newMessageData[index].is_read = true
        }
        setAllMessages(newMessageData)
    }
    useEffect(()=>{
        setAllMessages(messages)
    }, [messages?.length])
    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            <Paper>
                <div className="flex flex-col gap-4 h-full">
                    {
                        loading ? (
                            <Loading/>
                        ) : error ? (
                            <Response message={error} type={"error"}/>
                        ) : allMessages.length == 0 ? (
                            <Response message={"notifikasi anda kosong"} type={"empty"}/>
                        ) : (
                            <MessageListAO datas={allMessages} setMessageRead={setMessageRead}/>
                        )
                    }
                </div>
            </Paper>
        </DashboardLayout>
    )
}