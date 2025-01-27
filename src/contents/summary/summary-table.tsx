// 'use client'

// import Table from "@/components/tables/table"
// import Button from "@/components/items/buttons/button"
// import { SummaryCabangModel, SummaryKanwilModel, SummaryPusatModel } from "@/models/summary-model"

// interface SummaryContentProps {
//     datas: SummaryPusatModel[] | SummaryKanwilModel[] | SummaryCabangModel[] | null
//     bcIndex: number
//     openDetail?: Function
// }

// export default function SummaryTable(props: SummaryContentProps) {
//     const headers = ["Lokasi", "Pemenang Baru", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit", ""]
//     const headerKC = ["NIP AO", "Nama AO", "Total Tender", "Success Rate", "Daya Serap (Rp)", "Penyaluran Kredit (Rp)"]

//     function toDetail(label:string, officeId: number){
//         let state = ""
//         switch(props.bcIndex){
//             case 0:
//                 state = "manager-kanwil"
//                 break
//             case 1:
//                 state = "manager-cabang"
//                 break
//             default:
//                 state = "manager-pusat"
//                 break
//         }
//         props.openDetail && props.openDetail(state, label, officeId)
//     }

//     return(
//         <Table className="h-full" headers={props.bcIndex == 2 ? headerKC : headers} datas={props.datas} usePagination={false}>
//             {props.datas?.map((data,i)=>(
//                 // props.bcIndex == 2 ? (
//                 //     <tr className="border-b-[1px]" key={"row-"+i}>
//                 //         <td className="px-2 py-2 text-sm">{data.nip}</td>
//                 //         <td className="px-2 py-2 text-sm">{data.nama}</td>
//                 //         <td className="px-2 py-2 text-sm">{data.success_rate}</td>
//                 //         <td className="px-2 py-2 text-sm">{data.total_tender}</td>
//                 //         <td className="px-2 py-2 text-sm">{data.daya_serap}</td>
//                 //         <td className="px-2 py-2 text-sm">{data.penyaluran_kredit}</td>
//                 //     </tr>
//                 // ) : (
//                 //     <tr className="border-b-[1px]" key={"row-"+i}>
//                 //         <td className="px-2 py-2 text-sm">{data.nama}</td>
//                 //         <td className="px-2 py-2 text-sm">{"40 Tender"}</td>
//                 //         <td className="px-2 py-2 text-sm">{"100%"}</td>
//                 //         <td className="px-2 py-2 text-sm">{"Rp. 400.000.000"}</td>
//                 //         <td className="px-2 py-2 text-sm">{"40%"}</td>
//                 //         <td className="px-2 py-2 text-sm">
//                 //             <div className="flex justify-center">
//                 //                 <Button type="primary" size="medium" onClick={()=>toDetail(data.nama, data.id)}>Detail</Button>
//                 //             </div>
//                 //         </td>
//                 //     </tr>
//                 // )
//                 props.bcIndex == 2 ? (
//                     <tr className="border-b-[1px]" key={"row-"+i}>
//                         <td className="px-2 py-2 text-sm">{data.user_nip}</td>
//                         <td className="px-2 py-2 text-sm">{data.user_nama}</td>
//                         <td className="px-2 py-2 text-sm">{"10"}</td> 
//                         <td className="px-2 py-2 text-sm">{(Number(data.tender_nilai_kredit) /Number(parseFloat(data.tender_nilai_tender))*100).toFixed(2)} %</td>
//                         <td className="px-2 py-2 text-sm">{Number(parseFloat(data.tender_nilai_tender))?.toLocaleString('id-ID')}</td>
//                         <td className="px-2 py-2 text-sm">{Number(data.tender_nilai_kredit)?.toLocaleString('id-ID')}</td>
//                     </tr>
//                 ) : props.bcIndex == 0 ? (
//                     <tr className="border-b-[1px]" key={"row-"+i}>
//                         <td className="px-2 py-2 text-sm">{"Kanwil "+data.kanwil_id}</td>
//                         <td className="px-2 py-2 text-sm">{data.total_pemenang_baru}</td>
//                         <td className="px-2 py-2 text-sm">{data.percent_kredit_disetujui}</td>
//                         <td className="px-2 py-2 text-sm">{data.total_diserap}</td>
//                         <td className="px-2 py-2 text-sm">{data.percent_mengajukan_kredit}</td>
//                         <td className="px-2 py-2 text-sm">
//                             <div className="flex justify-center">
//                                 <Button type="primary" size="medium" onClick={()=>toDetail("Kanwil "+data.kanwil_id, data.id)}>Detail</Button>
//                             </div>
//                         </td>
//                     </tr>
//                 ) : (
//                     <tr className="border-b-[1px]" key={"row-"+i}>
//                         <td className="px-2 py-2 text-sm">{data.nama}</td>
//                         <td className="px-2 py-2 text-sm">{data.total_pemenang_baru}</td>
//                         <td className="px-2 py-2 text-sm">{data.percentage_status_success_rate} %</td>
//                         <td className="px-2 py-2 text-sm">{Number(parseFloat(data.total_daya_serap))?.toLocaleString('id-ID')}</td>
//                         <td className="px-2 py-2 text-sm">{data.percentage_status_pengajuan_kredit} %</td>
//                         <td className="px-2 py-2 text-sm">
//                             <div className="flex justify-center">
//                                 <Button type="primary" size="medium" onClick={()=>toDetail(data.nama, data.id)}>Detail</Button>
//                             </div>
//                         </td>
//                     </tr>
//                 )
//             ))}
//         </Table>
//     )
// }