'use client'

import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"
import SummaryContent from "@/contents/summary/summary-content"
import SummaryTable from "@/contents/summary/summary-table"
import { SidebarNavigator } from "@/constants/navigator"
import { MonitoringPusatTableData, MonitoringKanwilTableData, MonitoringKCTableData } from "@/constants/monitoring/monitoring-table-data"
import { useUser } from "@/hooks/useUser";

export default function Dashboard(){
    const {role} = useUser()

    function getDataSummary(){
        switch(role){
            case "manager-pusat":
                return MonitoringPusatTableData
            case "manager-kanwil":
                return MonitoringKanwilTableData
            case "manager-cabang":
                return MonitoringKCTableData
            default:
                return MonitoringPusatTableData
        }
    }
    function getBCIndex(){
        switch(role){
            case "manager-pusat":
                return 0
            case "manager-kanwil":
                return 1
            case "manager-cabang":
                return 2
            default:
                return 0
        }
    }
    function getCurrLabel(){
        switch(role){
            case "manager-pusat":
                return "Semua Wilayah"
            case "manager-kanwil":
                return "Kantor Wilayah"
            case "manager-cabang":
                return "Kantor Cabang"
            default:
                return "Semua Wilayah"
        }
    }
    const [currState, setCurrState] = useState("")
    const [currRole, setCurRole] = useState(role)

    const index = 0;
    const [summaryDatas, setSummaryDatas] = useState<any[]>([])
    const [bcIndex, setBCIndex] = useState(0)
    const [currLabel, setCurrLabel] = useState("Semua Wilayah")
    const [breadcrumbItems, setBreadcrumbItems] = useState(
        [
            { label: SidebarNavigator[index].name, state: currState}
        ]
    );
    useEffect(() => {
        setSummaryDatas(getDataSummary())
        setBCIndex(getBCIndex())
        setCurrLabel(getCurrLabel())
        setCurrState(role)
        setCurRole(role)
        setBreadcrumbItems([
            { label: SidebarNavigator[index].name, state: role}
        ])
    }, [role])
    function switchBCState(state:string, label?:string){
        let currItems = breadcrumbItems

        switch(state){
            case "manager-pusat":
                setBreadcrumbItems([
                    { label: SidebarNavigator[index].name, state: "manager-pusat"},
                ])
                setSummaryDatas(MonitoringPusatTableData)
                setCurrLabel(getCurrLabel())
                setBCIndex(0)
                break;
            case "manager-kanwil":
                if(role==state){
                    setBreadcrumbItems([
                        { label: SidebarNavigator[index].name, state: "manager-kanwil"},
                    ])
                    setSummaryDatas(MonitoringKanwilTableData)
                    setCurrLabel(getCurrLabel())
                    setBCIndex(1)
                    break;
                }
                if(label){
                    currItems = breadcrumbItems.slice(0,2)
                    currItems.push({ label: label, state: "manager-kanwil" })
                    setBreadcrumbItems(currItems)
                    setCurrLabel(label)
                } else {
                    currItems = breadcrumbItems.slice(0,2)
                    setBreadcrumbItems(currItems)
                    setCurrLabel(currItems[currItems.length-1].label)
                }
                setSummaryDatas(MonitoringKanwilTableData)
                setBCIndex(1)
                break;
            case "manager-cabang":
                if(role==state){
                    setBreadcrumbItems([
                        { label: SidebarNavigator[index].name, state: "manager-cabang"},
                    ])
                    setSummaryDatas(MonitoringKCTableData)
                    setCurrLabel(getCurrLabel())
                    setBCIndex(2)
                    break;
                }
                if(label){
                    currItems = breadcrumbItems.slice(0, 3)
                    currItems.push({ label: label, state: "manager-cabang"})
                    setCurrLabel(label)
                    setBreadcrumbItems(currItems)
                } else {
                    currItems = breadcrumbItems.slice(0, 3)
                    setBreadcrumbItems(currItems)
                    setCurrLabel(currItems[currItems.length-1].label)
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
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems} onClickBC={handleBreadcrumbClick} role={currRole}>
            <div className="flex flex-col gap-4 h-full">
                <Paper className="">
                    <SummaryContent title={currLabel} stateIndex={bcIndex}/>
                </Paper>
                <Paper className="max-md:overflow-x-auto">
                    <SummaryTable datas={summaryDatas} bcIndex={bcIndex} openDetail={openDetail}/>
                </Paper>
            </div>
        </DashboardLayout>
        
    )
}