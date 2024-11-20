import SummaryBox from "./components/summary-box"
import { FaBoxArchive } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import PieChartSummary from "./components/pie-chart-summary";
import SummaryData from "@/constants/monitoring/summary-data";
import MonitoringChartData from "@/constants/monitoring/monitoring-chart-data";

export default function SummaryContent(){
    const pieData = MonitoringChartData
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
            <h1 className="font-bold text-sm">Semua Wilayah</h1>
            <div className="grid grid-cols-3 gap-4">
                {
                    SummaryData.map((data, i)=>(
                        <SummaryBox key={i} count={data.count} color={switchColor(data.id)[0]}>
                            <div className={"p-1 rounded-full " + switchColor(data.id)[1]}>
                                {data.id==1 && <FaBoxArchive className="text-white" size={18}/>}
                                {data.id==2 && <FaHandshake className="text-white" size={18}/>}
                                {data.id==3 && <FaRegThumbsUp className="text-white" size={18}/>}
                                {data.id==4 && <FaRegThumbsDown className="text-white" size={18}/>}
                                {data.id==5 && <PiTarget className="text-white" size={18}/>}
                                {data.id==6 && <FaXmark className="text-white" size={18}/>}
                            </div>
                            <p>{data.title}</p>
                        </SummaryBox>
                    ))
                }
            </div>
            <div className="grid grid-cols-3">
                {
                    pieData.map((pie, i)=>(
                        <PieChartSummary key={i} title={pie.title} data={pie.data.map((d)=>({
                            value: d.value,
                            label: d.name,
                            color: d.color,
                            textColor: d.textColor
                        }))}/>
                    ))
                }
            </div>
        </div>
    )
}