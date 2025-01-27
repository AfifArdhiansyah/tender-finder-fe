'use client'

import Table from "@/components/tables/table"
import { SummaryCabangModel } from "@/models/summary-model"

interface SummaryCabangContentProps {
    datas: SummaryCabangModel[]
    bcIndex: number
    openDetail?: (state: string, label: string, officeId: number)=>void
}

export default function SummaryCabangTable(props: SummaryCabangContentProps) {
    const headers = ["Lokasi", "Pemenang Baru", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit", ""]
    const headerKC = ["NIP AO", "Nama AO", "Total Tender", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit (Rp)"]

    return(
        <Table className="h-full" headers={props.bcIndex == 2 ? headerKC : headers} datas={props.datas} usePagination={false}>
            {props.datas?.map((data,i)=>(
                 <tr className="border-b-[1px]" key={"row-"+i}>
                    <td className="px-2 py-2 text-sm">{data.user_nip}</td>
                    <td className="px-2 py-2 text-sm">{data.user_nama}</td>
                    <td className="px-2 py-2 text-sm">{"10"}</td> 
                    <td className="px-2 py-2 text-sm">{Number((Number(data.tender_nilai_kredit) / Number(parseFloat(data.tender_nilai_tender.toString())) * 100).toFixed(2))} %</td>
                    <td className="px-2 py-2 text-sm">{Number(parseFloat(data.tender_nilai_tender.toString()))?.toLocaleString('id-ID')}</td>
                    <td className="px-2 py-2 text-sm">{Number(data.tender_nilai_kredit)?.toLocaleString('id-ID')}</td>
                </tr>
            ))}
        </Table>
    )
}