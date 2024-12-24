'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import TenderTable from "@/contents/tender/tender-tables/tender-table"
import { useTenderProjects } from "@/hooks/useTenderProjects"
import Paper from "@/components/frames/papes"
import { SidebarNavigator } from "@/constants/navigator"
import Response from "@/components/items/responses/response"
import Loading from "@/components/items/progress/loading"
import { useEffect, useState } from "react"
import { useCookies } from "next-client-cookies"
import { useGetOffice } from "@/hooks/useOffice"

export default function Tender(){
    const cookies = useCookies();

    const { tenderProjects, setSelectedFilter, loading, selectedBranch, setSelectedBranch, refresh, error } = useTenderProjects();
    const { offices,  getOfficeByWilayah} = useGetOffice()

    const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "KC Inisiator", "Status"]
    const tableColumns = ["nama", "nama_pemenang", "lokasi_pekerjaan", "nilai_tender", "kc", "status"]
    const tableDatas = tenderProjects
    
    const index = 1
    const breadcrumbItems = [{ label: SidebarNavigator[index].name, state: "pusat"}]

    //filtering purpose
    //status filter
    const statusOptions = ["semua","belum ada AO", "belum ditawarkan", "telah ditawarkan", "telah follow up", "debitur tertarik", "debitur tidak tertarik", "pencairan diterima", "pencairan ditolak"]
    function getFilterID(status: string|null){
        switch(status){
            case "belum ada AO":
                return "-1"
            case "belum ditawarkan":
                return "0"
            case "telah ditawarkan":
                return "1"
            case "telah follow up":
                return "2"
            case "debitur tertarik":
                return "3"
            case "debitur tidak tertarik":
                return "4"
            case "pencairan diterima":
                return "5"
            case "pencairan ditolak":
                return "6"
            default:
                return null
        }
    }
    function setStatusName(id: string|null){
        switch(id){
            case "-1":
                return("belum ada AO")
            case "0":
                return("belum ditawarkan")
            case "1":
                return("telah ditawarkan")
            case "2":
                return("telah follow up")
            case "3":
                return("debitur tertarik")
            case "4":
                return("debitur tidak tertarik")
            case "5":
                return("pencairan diterima")
            case "6":
                return("pencairan ditolak")
            default:
                return(null)
        }
    }
    const selectedFilter = cookies.get("selected-status") || null
    const [selectedStatus, setSelectedStatus] = useState<string|null>(setStatusName(selectedFilter))
    function handleStatusFilter(selected:string|null){
        setSelectedStatus(selected)
        setSelectedFilter(getFilterID(selected))
    }
    //branch filter
    const branchOptions = ["Semua Cabang"] as string[]
    if(cookies.get("role")=="manager-kanwil"){
        offices?.map((office) => {
            branchOptions.push(office.nama)
        })
    }
    function getBranchId(branch: string|null){
        const branchId = offices?.filter((office) => office.nama == branch)
        return branchId?.[0]?.id
    }
    function getBranchName(){
        if(selectedBranch == null) return null
        const branchName = offices?.filter((office) => office.id == parseInt(selectedBranch as unknown as string))
        return branchName?.[0]?.nama || null
    }
    async function getBranches(){
        const kanwilId = (parseInt(cookies.get("office-id") as unknown as string) % 10)
        await getOfficeByWilayah(kanwilId.toString())
    }
    useEffect(()=>{
        getBranches()
    }, [offices?.length])
    function handleBranchFilter(selected:string|null){
        if(selected == "Semua Cabang") setSelectedBranch(null)
        else setSelectedBranch(getBranchId(selected)?.toString() || null)
    }

    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems}>
            <Paper className="mb-4 max-md:overflow-x-auto h-full flex flex-col gap-4">
                {
                    loading ? (
                        <Loading/>
                    ) : error ? (
                       <Response type="error" message={error}/>
                    ) : (
                        <TenderTable 
                            headers={tableHeads} 
                            refreshTable={refresh} 
                            columns={tableColumns} 
                            datas={tableDatas} 
                            filterOption={statusOptions} 
                            selectedFilter={selectedStatus || null} 
                            findFilteredTable={handleStatusFilter}
                            offices={branchOptions}
                            selectedBranch={getBranchName() || null}
                            findFilteredBranch={handleBranchFilter}
                        />
                    )
                }
            </Paper>
        </DashboardLayout>
        
    )
}