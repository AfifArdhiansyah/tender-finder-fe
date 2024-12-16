import Image from "next/image";
import MapMini from "@/components/maps/map-mini";
import { TenderStatusModel } from "@/models/tender-status-model";
import { MapModal } from "@/components/maps/map-modal";
import { useState } from "react";
import Button from "@/components/items/buttons/button";
import FotoModalProgress from "../components/progress-foto-modal";
import Dropdown from "@/components/items/dropdowns/dropdown";
import { useUploadData } from "@/hooks/useTenderStatus";

interface ProgressTrackProps{
    datas: TenderStatusModel[]
    branchId: number,
    nilaiTender: string,
    tender_ltd: string,
    tender_lng: string,
    refresh: Function
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
    function getLabel(status:string, tanggal: string|undefined){
        switch(status){
            case "pemenang baru":
                return "Pemenang Baru"
            case "penawaran":
                if(!tanggal){
                    return "Menunggu AO Melakukan Follow Up"
                }
                return "Penawaran"
            case "pengajuan":
                if(!tanggal){
                    return "Menunggu Keputusan Pemenang Tender"
                }
                return "Pengajuan Kredit"
            case "tidak berminat":
                return "Tidak Berminat"
            case "kredit disetujui":
                if(!tanggal){
                    return "Menunggu Keputusan Manajemen"
                }
                return "Kredit Disetujui"
            case "kredit gagal":
                if(!tanggal){
                    return "Menunggu Keputusan Manajemen"
                }
                return "Kredit Gagal"
            default:
                return "Pemenang Baru"
        }
    }
    //input manager acc
    const options = ["Ya, pengajuan kredit disetujui", "Tidak, pengajuan kredit tidak disetujui"]
    const [selectedACCStatus, setSlectedACCStatus] = useState("")
    function onChangeSelect(selected:string){
        setSlectedACCStatus(selected)
    }
    const {updateManajemenACC, errorUpload} = useUploadData()
    function isSubmitDisabled(){
        if(selectedACCStatus==""){
            return true
        }
        return false
    }
    async function onSubmitKeputusanManajemen(idStatus:number){
        const id = idStatus
        const status = selectedACCStatus=="Ya, pengajuan kredit disetujui"?true:false
        await updateManajemenACC(id, status, props.branchId)
        if(!errorUpload){
            props.refresh()
        }
    }
    //map modal purpose
    const [selectedProgress, setSelectedProgress] = useState<TenderStatusModel>(props.datas[0])
    const [showMapPenawaranModal, setShowMapPenawaranModal] = useState(false)
    const openMapPenawaranModal = (data: TenderStatusModel) =>{
        setSelectedProgress(data)
        setShowMapPenawaranModal(true)
    }
    const closeMapPenawaranModal = () =>{
        setShowMapPenawaranModal(false)
    }
    const [showMapFollowUpModal, setShowMapFollowUpModal] = useState(false)
    const openMapFollowUpModal = (data: TenderStatusModel) =>{
        setSelectedProgress(data)
        setShowMapFollowUpModal(true)
    }
    const closeMapFollowUpModal = () =>{
        setShowMapFollowUpModal(false)
    }
    //foto modal purpose
    const [showFotoPenawaranModal, setShowFotoPenawaranModal] = useState(false)
    const openFotoPenawaranModal = (data: TenderStatusModel) =>{
        setSelectedProgress(data)
        setShowFotoPenawaranModal(true)
    }
    const closeFotoPenawaranModal = () =>{
        setShowFotoPenawaranModal(false)
    }
    const [showFotoFollowUpModal, setShowFotoFollowUpModal] = useState(false)
    const openFotoFollowUpModal = (data: TenderStatusModel) =>{
        setSelectedProgress(data)
        setShowFotoFollowUpModal(true)
    }
    const closeFotoFollowUpModal = () =>{
        setShowFotoFollowUpModal(false)
    }
    return(
        <div className="min-h-full flex flex-col gap">
            <>
                {
                    props.datas.map((data, index) => 
                        <div className="flex gap-2 h-full text-sm" key={index}>
                            <div className="flex flex-col items-center h-auto">
                                {
                                    index==0? (
                                        <>
                                            {data.ltd_loc?(<Image src={getIconSource(index, data)} alt="check" height={22} width={22}/>):(<Image src={"/icons/min-progress.svg"} alt="min" height={22} width={22}/>)}
                                            {index!=props.datas.length-1&& <div className={"h-full w-1 " + (data.dibuat_tanggal? getLineSideColor(index, data) : "bg-gray-300")}></div>}
                                        </>
                                    ) : (
                                        <>
                                            {data.dibuat_tanggal? <Image src={getIconSource(index, data)} alt="check" height={22} width={22}/> : <Image src={"/icons/min-progress.svg"} alt="min" height={22} width={22}/>}
                                            {index!=props.datas.length-1&& <div className={"h-full w-1 " + (data.dibuat_tanggal? getLineSideColor(index, data) : "bg-gray-300")}></div>}
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-2 pb-4 w-[70%]">
                                <h2 className={"font-bold " + (data.dibuat_tanggal||index==3?"text-black":"text-gray-300")}>{getLabel(data.status.nama, data.dibuat_tanggal)}</h2>
                                {
                                    data.dibuat_tanggal ? (
                                        <>
                                            {index==2 && data.produk_dipilih && (
                                                <>
                                                    <p className="text-gray-500">Produk yang dipilih: {data.produk_dipilih}</p>
                                                    <p className="text-gray-500">Pengajuan kredit: Rp. {parseFloat(props.nilaiTender as string).toLocaleString('id-ID')}</p>
                                                </>
                                            )}
                                            {index==2 && data.feedback && (
                                                <>
                                                    <p className="text-gray-500">Feedback: {data.feedback}</p>
                                                </>
                                            )}
                                            {
                                                (index==0) && (
                                                    data.ltd_loc?(
                                                        <div className="flex flex-col gap-2">
                                                            <div className="relative h-[150px] w-[250px] rounded">
                                                                <Image className="absolute h-full w-full" src={data.penawaran_file as string} width={150} height={300} alt={"file penawaran"} />
                                                                <div className="absolute bg-black opacity-0 w-full h-full flex items-center justify-center text-white hover:opacity-45">
                                                                    <button className="h-full w-full text-sm" onClick={()=>openFotoPenawaranModal(data)}>lihat foto</button>
                                                                </div>
                                                            </div>
                                                            <Button className="w-fit rounded" type={"success"} size={"small"} onClick={()=>openMapPenawaranModal(data)}>buka peta</Button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500">AO belum mengunjungi pemenang tender</p>
                                                    )
                                                )
                                            }
                                            {
                                                (index==1) && (
                                                    data.ltd_loc?(
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-gray-500">Keterangan AO: {data.keterangan}</p>
                                                            <div className="relative h-[150px] w-[250px]">
                                                                <Image className="absolute h-full w-full" src={data.bukti_file as string} width={300} height={300} alt={"file penawaran"} />
                                                                <div className="absolute bg-black opacity-0 w-full h-full flex items-center justify-center text-white hover:opacity-45">
                                                                    <button className="h-full w-full text-sm" onClick={()=>openFotoFollowUpModal(data)}>lihat foto</button>
                                                                </div>
                                                            </div>
                                                            <Button className="w-fit" type={"success"} size={"small"} onClick={()=>openMapFollowUpModal(data)}>buka peta</Button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500">AO belum melakukan penawaran lebih lanjut pemenang tender</p>
                                                    )
                                                )
                                            }
                                        </>
                                    ) : (
                                        index == 3 && (
                                            <div className=" flex flex-col gap-2 pb-16">
                                                <p className="text-gray-500">Pengajuan kredit: Rp. {parseFloat(props.nilaiTender as string).toLocaleString('id-ID')}</p>
                                                <p className="text-gray-500">Apakah anda menyetujui pengajuan kredit tersebut?</p>
                                                <div className="flex gap-2 w-full">
                                                    <Dropdown parentClassName="w-[500px]" label={"pilih keputusan"} options={options} onSelect={onChangeSelect}/>
                                                    <Button className="h-full" type={isSubmitDisabled()?"disable":"primary"} size={"small"} onClick={()=>{onSubmitKeputusanManajemen(data.id)}} disabled={isSubmitDisabled()}>submit</Button>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {
                    showMapPenawaranModal && 
                        <MapModal 
                            title="Lokasi Penawaran Kredit" 
                            subTitle="Lokasi Account Office menawarkan kredit ke pemenang tender"
                            isOpenModal={showMapPenawaranModal} 
                            onCancel={closeMapPenawaranModal} 
                            latitude={parseFloat(selectedProgress?.ltd_loc?selectedProgress?.ltd_loc:props.tender_ltd)} 
                            longitude={parseFloat(selectedProgress?.lng_loc?selectedProgress?.lng_loc:props.tender_lng)} 
                        />
                }
                {
                    showMapFollowUpModal && 
                        <MapModal 
                            title="Lokasi Follow Up Penawaran Kredit" 
                            subTitle="Lokasi Account Office melakukan follow up penawwaran kredit"
                            isOpenModal={showMapFollowUpModal} 
                            onCancel={closeMapFollowUpModal} 
                            latitude={parseFloat(selectedProgress?.ltd_loc?selectedProgress.ltd_loc:props.tender_ltd)} 
                            longitude={parseFloat(selectedProgress?.lng_loc?selectedProgress.lng_loc:props.tender_lng)}
                        />
                }{
                    showFotoPenawaranModal &&
                        <FotoModalProgress
                            url={selectedProgress.penawaran_file as string}
                            isOpen={showFotoPenawaranModal}
                            onClose={closeFotoPenawaranModal}
                            title="Foto Penawaran"
                            subTitle="Foto penawaran kredit"
                        />
                }
                {
                    showFotoFollowUpModal &&
                        <FotoModalProgress
                            url={selectedProgress.bukti_file as string}
                            isOpen={showFotoFollowUpModal}
                            onClose={closeFotoFollowUpModal}
                            title="Foto Follow Up"
                            subTitle="Foto follow up penawaran kredit"
                        />
                }
                
            </>
        </div>
    )
}