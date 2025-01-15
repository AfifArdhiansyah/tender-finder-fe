'use client'

import SummaryBox from "./components/summary-box"
import { SummaryDataPusat, SummaryDataKanwil, SummaryDataKC, SummaryDataAO } from "@/constants/monitoring/summary-data";
import { MonitoringChartDataPusat, MonitoringChartDataKanwil, MonitoringChartDataKC } from "@/constants/monitoring/monitoring-chart-data";
import Image from "next/image";
import PieChartSummary from "./components/pie-chart-summary";
import { useSummary } from "@/hooks/useSummary";
import Loading from "@/components/items/progress/loading";
import Response from "@/components/items/responses/response";
import { useEffect } from "react";

interface SummaryContentProps{
    title: string
    stateIndex: number
    officeId: number
}

export default function SummaryContent(props: SummaryContentProps){
    const {summary, loading, error, setOfficeId} = useSummary()
    useEffect(()=>{
        setOfficeId(props.officeId?.toString())
    }, [props.officeId])

    function switchDataChart(){
        switch(props.stateIndex){
            case 0:
                return MonitoringChartDataPusat
            case 1:
                return MonitoringChartDataKanwil
            case 2:
                return MonitoringChartDataKC
            default:
                return MonitoringChartDataPusat
        }
    }
    function switchDataSum(){
        switch(props.stateIndex){
            case 0:
                return SummaryDataPusat
            case 1:
                return SummaryDataKanwil
            case 2:
                return SummaryDataKC
            case 3:
                return SummaryDataAO
            default:
                return SummaryDataPusat
        }
    }
    const switchColor = (id:number):string[]=>{
        switch(id){
            case 1:
                return ["text-black", "bg-black"]
            case 2:
                return ["text-green-700", "bg-green-700"]
            case 3:
                return ["text-blue-500", "bg-blue-500"]
            case 4:
                return ["text-yellow-500", "bg-yellow-500"]
            case 5:
                return ["text-green-500", "bg-green-500"]
            case 6:
                return ["text-red-500", "bg-red-500"]
            default:
                return ["text-black", "bg-black"]
        }
    }
    return(
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-sm">{props.title}</h1>
            {
                loading ? (<Loading/>) :
                error ? (<Response message={error} type={"error"}/>) :
                (<>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4">
                    {/* {
                        switchDataSum().map((data, i)=>(
                            <SummaryBox key={i} count={data.count} color={switchColor(i+1)[0]}>
                                <div className={"p-1 rounded-full " + switchColor(i+1)[1]}>
                                    {i+1==1 && <Image src={"/icons/briefcase.svg"} height={18} width={18} alt="sum-icon"/>}
                                    {i+1==2 && <Image src={"/icons/map-pin.svg"} height={18} width={18} alt="sum-icon"/>}
                                    {i+1==3 && <Image src={"/icons/thumbs-up.svg"} height={18} width={18} alt="sum-icon"/>}
                                    {i+1==4 && <Image src={"/icons/thumbs-down.svg"} height={18} width={18} alt="sum-icon"/>}
                                    {i+1==5 && <Image src={"/icons/check-circle.svg"} height={18} width={18} alt="sum-icon"/>}
                                    {i+1==6 && <Image src={"/icons/x-circle.svg"} height={18} width={18} alt="sum-icon"/>}
                                </div>
                                <p>{data.title}</p>
                            </SummaryBox>
                        ))
                    } */}
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
                            {/* {
                                switchDataChart().map((pie, i)=>(
                                    <PieChartSummary key={i} title={pie.title} data={pie.data.map((d)=>({
                                        value: d.value,
                                        label: d.name,
                                        color: d.color
                                    }))}/>
                                ))
                            } */}
                            <PieChartSummary title={"Success Rate (%)"} data={[
                                {
                                    value: Math.floor(((summary?.total_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    label: "Mengajukan Kredit",
                                    color: "rgb(34 197 94)"
                                },
                                {
                                    value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    label: "Tidak Mengajukan Kredit",
                                    color: "rgb(250 204 21)"
                                }
                            ]} />
                            <PieChartSummary title={"Daya Serap (%)"} data={[
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
                            ]} />
                            <PieChartSummary title={"Pengajuan Kredit"} data={[
                                {
                                    value: Math.floor(((summary?.total_mengajukan_kredit || 0) / ((summary?.total_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    label: "Kredit Disetujui",
                                    color: "rgb(34 197 94)"
                                },
                                {
                                    value: Math.floor(((summary?.total_tidak_mengajukan_kredit || 0) / ((summary?.total_tidak_mengajukan_kredit || 0) + (summary?.total_tidak_mengajukan_kredit || 0)) || 0)*100),
                                    label: "Kredit Ditolak",
                                    color: "#E5131D"
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