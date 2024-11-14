import DashboardLayout from "@/layouts/dashboard-layout"
import TenderTable from "@/components/tables/tender-table"
import TenderData from "@/constants/dump-data"

export default function Tender(){
    const tableHeads = ["Nama Tender", "Pemenang Tender", "Alamat Pemenang", "Harga Tender (Rp.)", "Status"]
    const tableColumns = ["nama", "nama_pemenang", "alamat_pemenang", "nilai_teder", "status"]
    const tableDatas = TenderData
    return(
        <DashboardLayout sideNavIndex={1}>
            <TenderTable headers={tableHeads} columns={tableColumns} datas={tableDatas}/>
        </DashboardLayout>
        
    )
}