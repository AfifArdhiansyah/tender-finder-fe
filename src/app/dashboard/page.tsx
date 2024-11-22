'use client'

import { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"
import SummaryContent from "@/contents/summary/summary-content"
import SummaryTable from "@/contents/summary/summary-table"
import { SidebarNavigator } from "@/constants/navigator"
import { MonitoringPusatTableData, MonitoringKanwilTableData, MonitoringKCTableData } from "@/constants/monitoring/monitoring-table-data"

export default function Dashboard(){
    const index = 0;
    const [summaryDatas, setSummaryDatas] = useState<any[]>(MonitoringPusatTableData)
    const [breadcrumbItems, setBreadcrumbItems] = useState(
        [
            { label: SidebarNavigator[index].name, state: "pusat"}
        ]
    );
    const [bcIndex, setBCIndex] = useState(0)
    const [currState, setCurrState] = useState("Semua Wilayah")
    function switchBCState(state:string, label?:string){
        let currItems = breadcrumbItems
        switch(state){
            case "pusat":
                setBreadcrumbItems([
                    { label: SidebarNavigator[index].name, state: "pusat"},
                ])
                setSummaryDatas(MonitoringPusatTableData)
                setCurrState("Semua Wilayah")
                setBCIndex(0)
                break;
            case "kanwil":
                if(label){
                    currItems = breadcrumbItems.slice(0,2)
                    currItems.push({ label: label, state: "kanwil" })
                    setBreadcrumbItems(currItems)
                    setCurrState(label)
                } else {
                    currItems = breadcrumbItems.slice(0,2)
                    setBreadcrumbItems(currItems)
                    setCurrState(currItems[currItems.length-1].label)
                }
                setSummaryDatas(MonitoringKanwilTableData)
                setBCIndex(1)
                break;
            case "kc":
                if(label){
                    currItems = breadcrumbItems.slice(0, 3)
                    currItems.push({ label: label, state: "kc"})
                    setCurrState(label)
                    setBreadcrumbItems(currItems)
                } else {
                    currItems = breadcrumbItems.slice(0, 3)
                    setBreadcrumbItems(currItems)
                    setCurrState(currItems[currItems.length-1].label)
                }
                setBreadcrumbItems(currItems)
                setSummaryDatas(MonitoringKCTableData)
                setBCIndex(2)
                break;
        }
    }
    function handleBreadcrumbClick(state:string){
        switchBCState(state)
    };
    function openDetail(state:string, label:string){
        switchBCState(state, label)
    }
    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems} onClickBC={handleBreadcrumbClick}>
            <div className="flex flex-col gap-4 h-full">
                <Paper className="">
                    <SummaryContent title={currState} stateIndex={bcIndex}/>
                </Paper>
                <Paper className="">
                    <SummaryTable datas={summaryDatas} bcIndex={bcIndex} openDetail={openDetail}/>
                </Paper>
            </div>
        </DashboardLayout>
        
    )
}