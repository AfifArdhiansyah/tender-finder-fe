import Image from "next/image";
import { TenderStatusModel } from "@/models/tender-status-model";
import { MapModal } from "@/components/maps/map-modal";
import { useState } from "react";
import Button from "@/components/items/buttons/button";
import FotoModalProgress from "../components/progress-foto-modal";
import Dropdown from "@/components/items/dropdowns/dropdown";
import { useUploadData } from "@/hooks/useTenderStatus";
import { PdfModal } from "@/components/files/pdf-modal";
import ChooseAOModal from "@/contents/manager-ao/ao-modals/choose-ao-modal";
import { TenderProjectModel } from "@/models/tender-project-model";
import { useUserContext } from "@/contexts/useUserContext";

interface ProgressTrackProps{
    datas: TenderStatusModel[]
    namaAO: string|null,
    branchId: number,
    nilaiTender: string,
    tender_ltd: string,
    tender_lng: string,
    refresh: Function
    dataTender: TenderProjectModel | null
}

export default function ProgressTrack(props: ProgressTrackProps){
    const {user} = useUserContext()
    const role = user?.role

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
    //pdf modal purpose
    const [showPdfModal, setShowPdfModal] = useState(false)
    const openPdfModal = (data: TenderStatusModel) =>{
        setSelectedProgress(data)
        setShowPdfModal(true)
    }
    const closePdfModal = () =>{
        setShowPdfModal(false)
    }
    function getRangeTwoDateInSecond(date1: string, date2: string){
        return Math.floor((new Date(date1).getTime() - new Date(date2).getTime()) / 1000)
    }
    function getRangeTwoDate(date1: string, date2: string){
        const seconds = getRangeTwoDateInSecond(date1, date2)
        const minutes = Math.floor(seconds/60)
        const hours = Math.floor(minutes/60)
        const days = Math.floor(hours/24)
        const returnStr = days + " hari " + hours%24 + " jam " + minutes%60 + " menit " + seconds%60 + " detik"
        return returnStr
    }
    //modal purpose
    const [isOpenModalAO, setIsOpenModalAO] = useState(false)
    const [selectedTenderName, setSelectedTenderName] = useState("")
    const showModalAO = () => {
        setIsOpenModalAO(true);
    };
    const closeModalAO = () => {
        setIsOpenModalAO(false);
    };
    const onShowClickedAO = () =>{
        showModalAO()
    }
    const refreshTable = () =>{
        props.refresh()
        closeModalAO()
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
                                                    <p className="text-gray-500">Waktu Pelaksanaan: {new Date(data.updated_at).toLocaleString('id-ID')}</p>
                                                    <p className="text-gray-500">SLA: {getRangeTwoDate(data.updated_at, props.datas[1]?.updated_at)}</p>
                                                    <p className="text-gray-500">Produk yang dipilih: {data.produk_dipilih}</p>
                                                    <p className="text-gray-500">Pengajuan kredit: Rp. {parseFloat(data.nilai_kredit as string).toLocaleString('id-ID')}</p>
                                                </>
                                            )}
                                            {index==2 && data.feedback && (
                                                <>
                                                    <p className="text-gray-500">Waktu Pelaksanaan: {new Date(data.updated_at).toLocaleString('id-ID')}</p>
                                                    <p className="text-gray-500">SLA: {getRangeTwoDate(data.updated_at, props.datas[1]?.updated_at)}</p>
                                                    <p className="text-gray-500">Feedback: {data.feedback}</p>
                                                </>
                                            )}
                                            {
                                                (index==0) && (
                                                    data.ltd_loc?(
                                                        <div className="flex flex-col gap-2">
                                                            {/* <div className="relative h-[150px] w-[250px] rounded">
                                                                <Image className="absolute h-full w-full" src={data.penawaran_file as string} width={150} height={300} alt={"file penawaran"} />
                                                                <div className="absolute bg-black opacity-0 w-full h-full flex items-center justify-center text-white hover:opacity-45">
                                                                    <button className="h-full w-full text-sm" onClick={()=>openFotoPenawaranModal(data)}>lihat foto</button>
                                                                </div>
                                                            </div> */}
                                                            <p className="text-gray-500">Waktu Pelaksanaan: {new Date(data.updated_at).toLocaleString('id-ID')}</p>
                                                            <p className="text-gray-500">SLA: {getRangeTwoDate(data.updated_at, data.created_at)}</p>
                                                            <Button className="w-fit rounded" type={"success"} size={"small"} onClick={()=>openPdfModal(data)}>buka file tanda terima</Button>
                                                            <Button className="w-fit rounded" type={"success"} size={"small"} onClick={()=>openMapPenawaranModal(data)}>buka peta</Button>
                                                        </div>
                                                    ) : (
                                                        props.namaAO?(
                                                            <p className="text-gray-500">AO belum mengunjungi pemenang tender</p>
                                                        ):(
                                                            <div className="flex flex-col gap-2">
                                                                <p className="text-gray-500">AO belum ditentukan</p>
                                                                <Button 
                                                                    type={
                                                                        role=="manager-cabang"?"alert":"disable"
                                                                    } 
                                                                    size="medium" 
                                                                    onClick={onShowClickedAO}
                                                                    disabled={role=="manager-cabang"?false:true}
                                                                    className="w-fit px-6"
                                                                >pilih AO</Button>
                                                            </div>
                                                        )
                                                    )
                                                )
                                            }
                                            {
                                                (index==1) && (
                                                    data.ltd_loc?(
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-gray-500">Waktu Pelaksanaan: {new Date(data.updated_at).toLocaleString('id-ID')}</p>
                                                            <p className="text-gray-500">SLA: {getRangeTwoDate(data.updated_at, props.datas[0]?.updated_at)}</p>
                                                            <div className="relative h-[150px] w-[250px]">
                                                                {
                                                                    (data.bukti_file && data.bukti_file.length > 0) && <Image className="absolute h-full w-full" src={data.bukti_file as string} width={300} height={300} alt={"file penawaran"} />
                                                                }
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
                                            {
                                                index==3 && (
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-gray-500">Waktu Pelaksanaan: {new Date(data.updated_at).toLocaleString('id-ID')}</p>
                                                        <p className="text-gray-500">SLA: {getRangeTwoDate(data.updated_at, props.datas[2]?.updated_at)}</p>
                                                    </div>
                                                )
                                            }
                                        </>
                                    ) : (
                                        index == 3 && (
                                            <div className=" flex flex-col gap-2 pb-16">
                                                <p className="text-gray-500">Pengajuan kredit: Rp. {parseFloat(props.datas[2]?.nilai_kredit as string).toLocaleString('id-ID')}</p>
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
                {
                    showPdfModal &&
                        <PdfModal
                            isOpenModal={showPdfModal}
                            onCancel={closePdfModal}
                            title="File Tanda Terima"
                            subTitle="File tanda terima penawaran kredit ke calon debitur"
                            url={selectedProgress.penawaran_file as string}
                        />
                }
                {
                    isOpenModalAO ? <ChooseAOModal open={isOpenModalAO} onCancel={closeModalAO} tenderName={selectedTenderName} refreshTable={refreshTable} dataTender={props.dataTender as TenderProjectModel}/> : null
                }
                
            </>
        </div>
    )
}