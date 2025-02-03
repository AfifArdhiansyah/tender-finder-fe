'use client'

import SummaryBox from "./components/summary-box"
import Image from "next/image";
import PieChartSummary from "./components/pie-chart-summary";
import { useSummary } from "@/hooks/useSummary";
import Loading from "@/components/items/progress/loading";
import Response from "@/components/items/responses/response";
import { numberToIdrFormat } from "@/services/formatIDR";

interface SummaryContentProps{
    title: string
    stateIndex: number
    officeId: number
}

export default function SummaryContent(props: SummaryContentProps){
    const {summary, loading, error} = useSummary()
    return(
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-sm">{props.title}</h1>
            {
                loading ? (<Loading/>) :
                error ? (<Response message={error} type={"error"}/>) :
                (<>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4">
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"belum ditawarkan"} className={"hover:bg-black hover:border-black hover:text-white"} count={summary?.total_pemenang_baru as number} color={"group-hover:text-white text-black"}>
                        <div className={"p-1 rounded-full bg-black"}>
                            <Image src={"/icons/briefcase.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Pemenang Tender Baru</p>
                    </SummaryBox>
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"telah follow up"} className={"hover:bg-green-700 hover:border-green-700 hover:text-white"} count={summary?.total_penawaran as number} color={"group-hover:text-white text-green-700"}>
                        <div className={"p-1 rounded-full bg-green-700"}>
                            <Image src={"/icons/map-pin.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Penawaran Kredit</p>
                    </SummaryBox>
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"debitur tertarik"} className={"hover:bg-blue-500 hover:border-blue-500 hover:text-white"} count={summary?.total_mengajukan_kredit as number} color={"group-hover:text-white text-blue-500"}>
                        <div className={"p-1 rounded-full bg-blue-500"}>
                            <Image src={"/icons/thumbs-up.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Mengajukan Kredit</p>
                    </SummaryBox>
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"debitur tidak tertarik"} className={"hover:bg-yellow-500 hover:border-yellow-500 hover:text-white"} count={summary?.total_tidak_mengajukan_kredit as number} color={"group-hover:text-white text-yellow-500"}>
                        <div className={"p-1 rounded-full bg-yellow-500"}>
                            <Image src={"/icons/thumbs-down.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Tidak Mengajukan Kredit</p>
                    </SummaryBox>
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"pencairan diterima"} className={"hover:bg-green-500 hover:border-green-500 hover:text-white"} count={summary?.total_kredit_disetujui as number} color={"group-hover:text-white text-green-500"}>
                        <div className={"p-1 rounded-full bg-green-500"}>
                            <Image src={"/icons/check-circle.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Kredit Disetujui</p>
                    </SummaryBox>
                    <SummaryBox branchId={props.officeId?.toString()} stateIndex={props.stateIndex} status={"pencairan ditolak"} className={"hover:bg-red-500 hover:border-red-500 hover:text-white"} count={summary?.total_kredit_tidak_disetujui as number} color={"group-hover:text-white text-red-500"}>
                        <div className={"p-1 rounded-full bg-red-500"}>
                            <Image src={"/icons/x-circle.svg"} height={18} width={18} alt="sum-icon"/>
                        </div>
                        <p>Kredit Ditolak</p>
                    </SummaryBox>
                </div>
                {
                    props.title != "AO" &&(
                        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                            <PieChartSummary title={"Success Rate (%)"} data={[
                                {
                                    // value: Math.floor(((summary?.total_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_mengajukan_kredit.toFixed(2)) || 0,
                                    label: "Mengajukan Kredit",
                                    color: "rgb(34 197 94)"
                                },
                                {
                                    // value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_tidak_mengajukan_kredit.toFixed(2)) || 0,
                                    label: "Tidak Mengajukan Kredit",
                                    color: "rgb(250 204 21)"
                                },
                                {
                                    // value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_mengajukan_kredit_sisa.toFixed(2)) || 0,
                                    label: "Belum Ditawarkan",
                                    color: "rgb(179, 204, 230)"
                                }
                            ]} />
                            {/* <PieChartSummary title={"Daya Serap (%)"} data={[
                                {
                                    value: Math.floor(summary?.percent_diserap || 0),
                                    label: "Diserap",
                                    color: "rgb(34 197 94)"
                                },
                                {
                                    value: Math.floor(summary?.percent_tidak_diserap || 0),
                                    label: "Tidak Diserap",
                                    color: "#4A5260"
                                }
                            ]} /> */}
                            <div className="flex flex-col h-full items-center gap-2">
                                <p className="gray-400">Kredit Diserap</p>
                                <div className="flex flex-col h-full items-center justify-center">
                                    <p className="text-green-500 text-4xl font-bold border border-green-500 rounded-lg p-2">Rp. {numberToIdrFormat(summary?.total_diserap || 0)}</p>
                                </div>
                                <p className="gray-400">Total Nilai Tender</p>
                                <div className="flex flex-col h-full items-center justify-center">
                                    <p className="text-[#9ebde0] text-4xl font-bold border border-[#9ebde0] rounded-lg p-2">Rp. {numberToIdrFormat(summary?.total_nilai_tender || 0)}</p>
                                </div>
                            </div>
                            <PieChartSummary title={"Pengajuan Kredit (%)"} data={[
                                {
                                    // value: Math.floor(((summary?.total_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_kredit_disetujui.toFixed(2)) || 0,
                                    label: "Kredit Disetujui",
                                    color: "rgb(34 197 94)"
                                },
                                {
                                    // value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_tidak_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_kredit_tidak_disetujui.toFixed(2)) || 0,
                                    label: "Kredit Ditolak",
                                    color: "#E5131D"
                                },
                                {
                                    // value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    value: Number(summary?.percent_kredit_disetujui_sisa.toFixed(2)) || 0,
                                    label: "Belum Ditawarkan",
                                    color: "rgb(179, 204, 230)"
                                }
                            ]} />
                        </div>
                    )
                }
                </>)
            }
        </div>
    )
}