import Image from "next/image";
import MapMini from "@/components/maps/map-mini";
import { TenderStatusModel } from "@/models/tender-status-model";

interface ProgressTrackProps{
    datas: TenderStatusModel[]
    nilaiTender: string
}

export default function ProgressTrack(props: ProgressTrackProps){
    function getIconSource(index: number, data: TenderStatusModel){
        if(index==1 && data.status.id==2) return "/icons/check-progress.svg"
        if(index==1 && data.status.id!=2) return "/icons/cross-progress.svg"
        if(index==2 && data.status.id==3) return "/icons/check-progress.svg"
        if(index==2 && data.status.id!=3) return "/icons/cross-progress.svg"
        if(index==3 && data.status.id==5) return "/icons/check-progress.svg"
        if(index==3 && data.status.id!=5) return "/icons/cross-progress.svg"
        if(index!=1 && index!=3) return "/icons/check-progress.svg"
        return "/icons/min-progress.svg"
    }
    function getLineSideColor(index: number, data: TenderStatusModel){
        if(index==1 && data.status.id==2) return "bg-[#21BC16]"
        if(index==1 && data.status.id!=2) return "bg-red-500"
        if(index==2 && data.status.id==3) return "bg-[#21BC16]"
        if(index==2 && data.status.id!=3) return "bg-red-500"
        if(index==3 && data.status.id==5) return "bg-[#21BC16]"
        if(index==3 && data.status.id!=5) return "bg-red-500"
        if(index!=1 && index!=3) return "bg-[#21BC16]"
        return "bg-gray-300"
    }
    return(
        <div className="h-full flex flex-col gap">
            {
                props.datas.map((data, index) => 
                    <div className="flex gap-2 h-full text-sm" key={index}>
                        <div className="flex flex-col items-center h-auto">
                            {data.dibuat_tanggal? <Image src={getIconSource(index, data)} alt="check" height={22} width={22}/> : <Image src={"/icons/min-progress.svg"} alt="min" height={22} width={22}/>}
                            {index!=props.datas.length-1&& <div className={"h-full w-1 " + (data.dibuat_tanggal? getLineSideColor(index, data) : "bg-gray-300")}></div>}
                        </div>
                        <div className="flex flex-col gap-2 pb-4">
                            <h2 className={"font-bold " + (data.dibuat_tanggal?"text-black":"text-gray-300")}>{data.status.nama}</h2>
                            {
                                data.dibuat_tanggal && (
                                    <>
                                        <p className="text-gray-500">{data.keterangan}</p>
                                        {index==2 && (
                                            <>
                                                <p className="text-gray-500">Produk yang dipilih: {data.produk_dipilih}</p>
                                                <p className="text-gray-500">Pengajuan kredit: Rp. {parseFloat(props.nilaiTender as string).toLocaleString('id-ID')}</p>
                                            </>
                                        )}
                                        {
                                            (index==0 || index==1) && (
                                                <MapMini latitude={parseFloat(data.ltd_loc as string)} longitude={parseFloat(data.lng_loc as string)} />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}