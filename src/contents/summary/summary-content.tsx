'use client'

import SummaryBox from "./components/summary-box"
import { SummaryDataPusat, SummaryDataKanwil, SummaryDataKC } from "@/constants/monitoring/summary-data";
import { MonitoringChartDataPusat, MonitoringChartDataKanwil, MonitoringChartDataKC } from "@/constants/monitoring/monitoring-chart-data";
import Image from "next/image";
import PieChartSummary from "./components/pie-chart-summary";

interface SummaryContentProps{
    title: string
    stateIndex: number
}

export default function SummaryContent(props: SummaryContentProps){
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
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4">
                {
                    switchDataSum().map((data, i)=>(
                        <SummaryBox key={i} count={data.count} color={switchColor(data.id)[0]}>
                            <div className={"p-1 rounded-full " + switchColor(data.id)[1]}>
                                {data.id==1 && <Image src={"/icons/briefcase.svg"} height={18} width={18} alt="sum-icon"/>}
                                {data.id==2 && <Image src={"/icons/map-pin.svg"} height={18} width={18} alt="sum-icon"/>}
                                {data.id==3 && <Image src={"/icons/thumbs-up.svg"} height={18} width={18} alt="sum-icon"/>}
                                {data.id==4 && <Image src={"/icons/thumbs-down.svg"} height={18} width={18} alt="sum-icon"/>}
                                {data.id==5 && <Image src={"/icons/check-circle.svg"} height={18} width={18} alt="sum-icon"/>}
                                {data.id==6 && <Image src={"/icons/x-circle.svg"} height={18} width={18} alt="sum-icon"/>}
                            </div>
                            <p>{data.title}</p>
                        </SummaryBox>
                    ))
                }
            </div>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                {
                    switchDataChart().map((pie, i)=>(
                        <PieChartSummary key={i} title={pie.title} data={pie.data.map((d)=>({
                            value: d.value,
                            label: d.name,
                            color: d.color
                        }))}/>
                    ))
                }
            </div>
        </div>
    )
}