'use client'

import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout"
import Paper from "@/components/frames/papes"
import SummaryContent from "@/contents/summary/summary-content"
import SummaryPusatTable from "@/contents/summary/summary-pusat-table";
import SummaryKanwilTable from "@/contents/summary/summary-kanwil-table";
import SummaryCabangTable from "@/contents/summary/summary-cabang-table";
import { SidebarNavigator } from "@/constants/navigator"
import { useCookies } from "next-client-cookies";
import Loading from "@/components/items/progress/loading";
import Response from "@/components/items/responses/response";
import { useTableSummary } from "@/hooks/useSummary";
import { useUserContext } from "@/contexts/useUserContext";

export default function Dashboard(){
    const {user} = useUserContext()
    const role = user?.role || "ao"
    // const { offices, loading, error, getOfficeByWilayah, getAllWilayah } = useGetOffice()
    //usegetsummary
    const {
        fetchSummaryPusat,
        fetchSummaryKanwil,
        fetchSummaryCabang,
        tablePusatSummary, 
        tableKanwilSummary, 
        tableCabangSummary, 
        loading, 
        error 
    } = useTableSummary()

    async function getDataSummary(){
        switch(currState){
            case "manager-pusat":
                if(role==currState || currState.length==0){
                    await fetchSummaryPusat()
                    
                }
                break;
            case "manager-kanwil":
                if(role==currState || currState.length==0){
                    await fetchSummaryKanwil(kanwilId as unknown as number)
                    
                }
                break;
            case "manager-cabang":
                await fetchSummaryCabang(branchId)
                
                break;
        }
    }
    function getBCIndex(){
        switch(currState){
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
        switch(currState){
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
    const [currOfficeId, setCurrOfficeId] = useState(0)
    const [branchId, setBranchId] = useState(1)
    const [kanwilId, setKanwilId] = useState("1")
    const [kanwilOfficeId, setKanwilOfficeId] = useState("1111")

    const index = 0;
    const [bcIndex, setBCIndex] = useState(0)
    const [currLabel, setCurrLabel] = useState("Semua Wilayah")
    const [breadcrumbItems, setBreadcrumbItems] = useState(
        [
            { label: SidebarNavigator[index].name, state: currState}
        ]
    );
    const cookies = useCookies();
    useEffect(() => {
        setBCIndex(getBCIndex())
        setCurrLabel(getCurrLabel())
        setCurrState(role)
        setCurRole(role)
        setBreadcrumbItems([
            { label: SidebarNavigator[index].name, state: role}
        ])
        if(role=="manager-kanwil"){
            setKanwilId(((cookies.get("office-id") || 0) as number) %10 as unknown as string)
            setKanwilOfficeId((cookies.get("office-id") || 0) as unknown as string)
        }
        else if(role=="manager-cabang"){
            setBranchId(parseInt(cookies.get("office-id") as string) || 1)
        }
    }, [role])
    useEffect(() => {
        getDataSummary()
        setBCIndex(getBCIndex())
        setCurrLabel(getCurrLabel())
        if(role=="manager-kanwil"){
            setKanwilId(((cookies.get("office-id") || 0) as number) %10 as unknown as string)
            setKanwilOfficeId((cookies.get("office-id") || 0) as unknown as string)
            
        }
        else if(role=="manager-cabang"){
            setBranchId(parseInt(cookies.get("office-id") as string) || 1)
            
        }
        else if(role=="manager-pusat"){
            
        }
    }, [
        tablePusatSummary?.length, 
        tableKanwilSummary?.length, 
        tableCabangSummary?.length, 
        currState, 
        kanwilId]
    )
    async function switchBCState(state:string, label?:string, officeId?: number){
        let currItems = breadcrumbItems
        const selectedKanwil = officeId? (officeId as number) % 10 : kanwilId

        switch(state){
            case "manager-pusat":
                setBreadcrumbItems([
                    { label: SidebarNavigator[index].name, state: "manager-pusat"},
                ])
                await fetchSummaryPusat()
                setCurrLabel(getCurrLabel())
                setBCIndex(0)
                break;
            case "manager-kanwil":
                await fetchSummaryKanwil(selectedKanwil as number)
                if(role==state){
                    setBreadcrumbItems([
                        { label: SidebarNavigator[index].name, state: "manager-kanwil"},
                    ])
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
                
                setBCIndex(1)
                break;
            case "manager-cabang":
                await fetchSummaryCabang(branchId as number)
                if(role==state){
                    setBreadcrumbItems([
                        { label: SidebarNavigator[index].name, state: "manager-cabang"},
                    ])
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
                
                setBCIndex(2)
                break;
        }
    }
    function handleBreadcrumbClick(state:string | undefined){
        setCurrState(state || "")
        switchBCState(state || "")
        if(state=="manager-kanwil"){
            setCurrOfficeId(parseInt(kanwilOfficeId))
        } else {
            setCurrOfficeId(0)
        }
    };
    function openDetail(state:string, label:string, officeId: number){
        if(state=="manager-kanwil"){
            setKanwilId(officeId%10 as unknown as string)
            setKanwilOfficeId(officeId as unknown as string)
        }
        else if(state=="manager-cabang"){
            setBranchId(officeId)
        }
        setCurrState(state)
        switchBCState(state, label, officeId)
        setCurrOfficeId(officeId)
    }
    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems} onClickBC={handleBreadcrumbClick} role={currRole}>
            <div className="flex flex-col gap-4 h-full">
                <Paper className="">
                    <SummaryContent title={currLabel} stateIndex={bcIndex} officeId={currOfficeId}/>
                </Paper>
                <Paper className="max-md:overflow-x-auto">
                    {
                        loading ? (
                            <Loading/>
                        ) : (
                            error? (
                                <Response message={error} type={"error"} />
                            ) : (
                                bcIndex == 2 ? (
                                    <SummaryCabangTable datas={tableCabangSummary} bcIndex={bcIndex} openDetail={openDetail}/>
                                ) : bcIndex == 1 ? (
                                    <SummaryKanwilTable datas={tableKanwilSummary} bcIndex={bcIndex} openDetail={openDetail}/>
                                ) : bcIndex == 0 ? (
                                    <SummaryPusatTable datas={tablePusatSummary} bcIndex={bcIndex} openDetail={openDetail}/>
                                ) : (
                                    <></>
                                )
                            )
                        )
                    }
                </Paper>
            </div>
        </DashboardLayout>
        
    )
}