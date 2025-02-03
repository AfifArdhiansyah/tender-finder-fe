'use client'

import Table from "@/components/tables/table"
import Button from "@/components/items/buttons/button"
import { SummaryKanwilModel } from "@/models/summary-model"

interface SummaryKanwilContentProps {
    datas: SummaryKanwilModel[]
    bcIndex: number
    openDetail?: (state: string, label: string, officeId: number)=>void
}

export default function SummaryKanwilTable(props: SummaryKanwilContentProps) {
    const headers = ["Lokasi", "Pemenang Baru", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit", ""]
    const headerKC = ["NIP AO", "Nama AO", "Total Tender", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit (Rp)"]

    function toDetail(label:string, officeId: number){
        let state = ""
        switch(props.bcIndex){
            case 0:
                state = "manager-kanwil"
                break
            case 1:
                state = "manager-cabang"
                break
            default:
                state = "manager-pusat"
                break
        }
        if( props.openDetail){
            props.openDetail(state, label, officeId)
        } 
    }

    return(
        <Table className="h-full" headers={props.bcIndex == 2 ? headerKC : headers} datas={props.datas} usePagination={false}>
            {props.datas?.map((data,i)=>(
                 <tr className="border-b-[1px]" key={"row-"+i}>
                    <td className="px-2 py-2 text-sm">{data.nama}</td>
                    <td className="px-2 py-2 text-sm">{data.total_pemenang_baru}</td>
                    <td className="px-2 py-2 text-sm">{data.percentage_status_success_rate} %</td>
                    <td className="px-2 py-2 text-sm">{Number(parseFloat(data.total_daya_serap?.toString() || "0"))?.toLocaleString('id-ID')}</td>
                    <td className="px-2 py-2 text-sm">{data.percentage_status_pengajuan_kredit} %</td>
                    <td className="px-2 py-2 text-sm">
                        <div className="flex justify-center">
                            <Button type="primary" size="medium" onClick={()=>toDetail(data.nama, data.id)}>Detail</Button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    )
}