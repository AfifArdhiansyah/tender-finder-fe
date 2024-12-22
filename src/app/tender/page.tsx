'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import TenderTable from "@/contents/tender/tender-tables/tender-table"
import { useTenderProjects } from "@/hooks/useTenderProjects"
import Paper from "@/components/frames/papes"
import { SidebarNavigator } from "@/constants/navigator"
import Response from "@/components/items/responses/response"
import Loading from "@/components/items/progress/loading"
import { useState } from "react"

export default function Tender(){

    const { tenderProjects, setSelectedFilter, loading, refresh, error } = useTenderProjects();

    const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "KC Inisiator", "Status"]
    const tableColumns = ["nama", "nama_pemenang", "lokasi_pekerjaan", "nilai_tender", "kc", "status"]
    const tableDatas = tenderProjects
    
    const index = 1
    const breadcrumbItems = [{ label: SidebarNavigator[index].name, state: "pusat"}]

    //filtering purpose
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
    const [selectedStatus, setSelectedStatus] = useState<string|null>()
    function handleStatusFilter(selected:string|null){
        setSelectedStatus(selected)
        setSelectedFilter(getFilterID(selected))
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
                        <TenderTable headers={tableHeads} refreshTable={refresh} columns={tableColumns} datas={tableDatas} filterOption={statusOptions} selectedFilter={selectedStatus || null} findFilteredTable={handleStatusFilter}/>
                    )
                }
            </Paper>
        </DashboardLayout>
        
    )
}