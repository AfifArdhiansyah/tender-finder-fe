'use client'

import Table from "@/components/tables/table"
import Button from "@/components/items/buttons/button"
import { MonitoringPusatTableData, MonitoringKanwilTableData } from "@/constants/monitoring/monitoring-table-data"

export default function SummaryTable() {
    const headers = ["Lokasi", "Pemenang Baru", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit", ""]
    const datas = MonitoringKanwilTableData

    function toDetail(){
        console.log("to detail")
    }

    return(
        <Table headers={headers} datas={datas}>
            {datas.map((data,i)=>(
                <tr key={"row-"+i}>
                    <td className="px-2 py-2 text-sm">{data.lokasi}</td>
                    <td className="px-2 py-2 text-sm">{data.pemenang_baru}</td>
                    <td className="px-2 py-2 text-sm">{data.success_rate}</td>
                    <td className="px-2 py-2 text-sm">{data.daya_serap}</td>
                    <td className="px-2 py-2 text-sm">{data.penyaluran_kredit}</td>
                    <td className="px-2 py-2 text-sm">
                        <div className="flex justify-center">
                            <Button type="primary" size="medium" onClick={toDetail}>Detail</Button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    )
}