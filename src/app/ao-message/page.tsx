'use client'

import { useState } from "react"
import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigatorAO } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import MessageDatas from "@/constants/message-data"
import MessageListAO from "@/contents/message/message-list-ao/message-list-ao"

export default function AOMessage(){
    const index = 2
    const role = 'ao'
    const bcItems = [
        {label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref}
    ] as BreadcrumbItem[]
    const [messageDatas, setMessageDatas] = useState(MessageDatas)
    function onSetMessage(data: any){
        setMessageDatas(data)
    }
    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            <div className="flex flex-col gap-4 h-full">
                <MessageListAO datas={messageDatas} setMessageDatas={onSetMessage}/>
            </div>
        </DashboardLayout>
    )
}