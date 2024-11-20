import SummaryBox from "./components/summary-box"
import { FaBoxArchive } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import PieChartSummary from "./components/pie-chart-summary";

export default function SummaryContent(){
    const pieData = [
        {
            title: "Success Rate",
            data: [
                {
                    name: "Mengajukan Kredit",
                    color: "#B64BA2",
                    textColor: "text-[#B64BA2]",
                    value: 20
                },
                {
                    name: "Tidak Mengajukan Kredit",
                    color: "#E5CC13",
                    textColor: "text-[#E5CC13]",
                    value: 80
                }
            ]
        },
        {
            title: "Daya Serap",
            data: [
                {
                    name: "Diserap",
                    color:"#89C0FF",
                    textColor:"text-[#89C0FF]",
                    value: 70
                },
                {
                    name: "Tidak Diserap",
                    color: "#4A5260",
                    textColor: "text-[#4A5260]",
                    value: 30
                }
            ]
        },
        {
            title: "Penyetujuan Kredit",
            data: [
                {
                    name: "Kredit Disetujui",
                    color:"#21BC16",
                    textColor:"text-[#21BC16]",
                    value: 40
                },
                {
                    name: "Kredit Ditolak",
                    color: "#E5131D",
                    textColor: "text-[#E5131D]",
                    value: 60
                }
            ]
        }
    ]
    return(
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-sm">Semua Wilayah</h1>
            <div className="grid grid-cols-3 gap-4">
                <SummaryBox count={50} color="text-black">
                    <div className="p-1 rounded-full bg-black">
                        <FaBoxArchive className="text-white" size={18}/>
                    </div>
                    <p>Pemenang Tender Baru</p>
                </SummaryBox>
                <SummaryBox count={25} color="text-green-700">
                    <div className="p-1 rounded-full bg-green-700">
                        <FaHandshake className="text-white" size={18}/>
                    </div>
                    <p>Penawaran Kredit</p>
                </SummaryBox>
                <SummaryBox count={10} color="text-blue-500">
                    <div className="p-1 rounded-full bg-blue-500">
                        <FaRegThumbsUp className="text-white" size={18}/>
                    </div>
                    <p>Mengajukan Kredit</p>
                </SummaryBox>
                <SummaryBox count={10} color="text-yellow-500">
                    <div className="p-1 rounded-full bg-yellow-500">
                        <FaRegThumbsDown className="text-white" size={18}/>
                    </div>
                    <p>Tidak Mengajukan Kredit</p>
                </SummaryBox>
                <SummaryBox count={5} color="text-green-500">
                    <div className="p-1 rounded-full bg-green-500">
                        <PiTarget className="text-white" size={18}/>
                    </div>
                    <p>Kredit Disetujui</p>
                </SummaryBox>
                <SummaryBox count={5} color="text-red-500">
                    <div className="p-1 rounded-full bg-red-500">
                        <FaXmark className="text-white" size={18}/>
                    </div>
                    <p>Kredit Ditolak</p>
                </SummaryBox>
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