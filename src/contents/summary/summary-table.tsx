'use client'

import Table from "@/components/tables/table"
import Button from "@/components/items/buttons/button"

interface SummaryContentProps {
    datas: any[]
    bcIndex: number
    openDetail?: Function
}

export default function SummaryTable(props: SummaryContentProps) {
    const headers = ["Lokasi", "Pemenang Baru", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit", ""]
    const headerKC = ["NIP AO", "Nama AO", "Total Tender", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit"]

    function toDetail(label:string){
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
        props.openDetail && props.openDetail(state, label)
    }

    return(
        <Table className="h-full" headers={props.bcIndex == 2 ? headerKC : headers} datas={props.datas} usePagination={false}>
            {props.datas.map((data,i)=>(
                props.bcIndex == 2 ? (
                    <tr className="border-b-[1px]" key={"row-"+i}>
                        <td className="px-2 py-2 text-sm">{data.nip}</td>
                        <td className="px-2 py-2 text-sm">{data.nama}</td>
                        <td className="px-2 py-2 text-sm">{data.success_rate}</td>
                        <td className="px-2 py-2 text-sm">{data.total_tender}</td>
                        <td className="px-2 py-2 text-sm">{data.daya_serap}</td>
                        <td className="px-2 py-2 text-sm">{data.penyaluran_kredit}</td>
                    </tr>
                ) : (
                    <tr className="border-b-[1px]" key={"row-"+i}>
                        <td className="px-2 py-2 text-sm">{data.lokasi}</td>
                        <td className="px-2 py-2 text-sm">{data.pemenang_baru}</td>
                        <td className="px-2 py-2 text-sm">{data.success_rate}</td>
                        <td className="px-2 py-2 text-sm">{data.daya_serap}</td>
                        <td className="px-2 py-2 text-sm">{data.penyaluran_kredit}</td>
                        <td className="px-2 py-2 text-sm">
                            <div className="flex justify-center">
                                <Button type="primary" size="medium" onClick={()=>toDetail(data.lokasi)}>Detail</Button>
                            </div>
                        </td>
                    </tr>
                )
            ))}
        </Table>
    )
}