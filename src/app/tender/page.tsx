'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import TenderTable from "@/contents/tender/tender-tables/tender-table"
import TenderData from "@/constants/dump-data"
import { useTenderProjects } from "@/hooks/useTenderProjects"
import Paper from "@/components/frames/papes"

export default function Tender(){
    // const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "Status"]
    // const tableColumns = ["nama", "nama_pemenang", "alamat_pemenang", "nilai_tender", "status"]
    // const tableDatas = TenderData

    const { tenderProjects, loading, error } = useTenderProjects();

    const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "Status"]
    const tableColumns = ["nama", "nama_pemenang", "lokasi_pekerjaan", "nilai_tender", "status"]
    const tableDatas = tenderProjects

    
    return(
        <DashboardLayout sideNavIndex={1}>
            <Paper className="mb-4 max-md:overflow-x-auto">
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <TenderTable headers={tableHeads} columns={tableColumns} datas={tableDatas}/>
                    )
                }
            </Paper>
        </DashboardLayout>
        
    )
}