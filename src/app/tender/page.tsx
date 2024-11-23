'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import TenderTable from "@/contents/tender/tender-tables/tender-table"
import { useTenderProjects } from "@/hooks/useTenderProjects"
import Paper from "@/components/frames/papes"
import { SidebarNavigator } from "@/constants/navigator"
import Response from "@/components/items/responses/response"
import Loading from "@/components/items/progress/loading"

export default function Tender(){
    // const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "Status"]
    // const tableColumns = ["nama", "nama_pemenang", "alamat_pemenang", "nilai_tender", "status"]
    // const tableDatas = TenderData

    const { tenderProjects, loading, error } = useTenderProjects();

    const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "Status"]
    const tableColumns = ["nama", "nama_pemenang", "lokasi_pekerjaan", "nilai_tender", "status"]
    const tableDatas = tenderProjects
    
    const index = 1
    const breadcrumbItems = [{ label: SidebarNavigator[index].name, state: "pusat"}]

    return(
        <DashboardLayout sideNavIndex={index} bcItems={breadcrumbItems}>
            <Paper className="mb-4 max-md:overflow-x-auto h-full flex flex-col gap-4">
                {
                    loading ? (
                        <Loading/>
                    ) : error ? (
                       <Response type="error" message={error}/>
                    ) : (
                        <TenderTable headers={tableHeads} columns={tableColumns} datas={tableDatas}/>
                    )
                }
            </Paper>
        </DashboardLayout>
        
    )
}