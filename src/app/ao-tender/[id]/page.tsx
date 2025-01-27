'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigatorAO } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import { useParams } from "next/navigation"
import Paper from "@/components/frames/papes"
import BorderedBox from "@/components/boxes/bordered-box"
import { useState } from "react"
import Progress from "@/components/progresses/progress"
import TenderProgresPenawaran from "@/contents/tender-ao/tender-progresses/tender-progres-penawaran"
import TenderProgresPengajuan from "@/contents/tender-ao/tender-progresses/tender-progres-pengajuan"
import TenderProgresTindakLanjut from "@/contents/tender-ao/tender-progresses/tender-progres-tindak-lanjut"
import TenderProgresPenyetujuan from "@/contents/tender-ao/tender-progresses/tender-progres-penyetujuan"
import ProgressButton from "@/contents/tender-ao/components/progress-button"
import { useGetTenderById } from "@/hooks/useTenderProjects"
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response"
import { TenderProjectModel } from "@/models/tender-project-model"
import { useUploadData } from "@/hooks/useTenderStatus"
import { useGeoLocation } from "@/hooks/useLocation"
import { TenderStatusModel } from "@/models/tender-status-model"

export default function AOTenderDetail(){
    const index = 1
    const role = 'ao'
    const { id } = useParams();
    const bcItems = [
        {label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref},
        {label: "Progres Tender", path: SidebarNavigatorAO[index].ref+"/"+id}
    ] as BreadcrumbItem[]
    const [contentIndex, setContentIndex] = useState(0)
    function contentPrev(){
        if(contentIndex!=0) setContentIndex(contentIndex-1)
    }
    function contentNext(){
        if(contentIndex!=3) setContentIndex(contentIndex+1)
    }
    const { tenderProject, refresh, loading, error } = useGetTenderById(id as string);
    const currStatus = tenderProject?.tender_statuses[tenderProject.tender_statuses.length-1].status.nama
    const currStatusData = tenderProject?.tender_statuses[tenderProject.tender_statuses.length-1]
    const indexStatusData = tenderProject?.tender_statuses[contentIndex]
    const dataProgress = [
        {label:"Penawaran", successed:false, ignored: false, inProgress: false},
        {label:"Tindak Lanjut", successed:false, ignored: false, inProgress: false},
        {label:"Mengajukan Kredit", successed:false, ignored: false, inProgress: false},
        {label:"Penyetujuan Kredit", successed:false, ignored: false, inProgress: false},
    ]
    function getDataProgress(){
        const newData = dataProgress
        if(currStatus == 'pemenang baru'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penawaran'){
                    if(!tenderProject?.tender_statuses[0]?.penawaran_file){
                        newData[data].successed = false
                        newData[data].inProgress = true
                    }
                    break
                }
            }
        }
        else if(currStatus == "penawaran"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Tindak Lanjut'){
                    if(!tenderProject?.tender_statuses[1]?.dibuat_tanggal){
                        newData[data].successed = false
                        newData[data].inProgress = true
                    }
                    break
                }
            }
        }
        else if(currStatus == "pengajuan" || currStatus == "tidak berminat"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Mengajukan Kredit'){
                    if(currStatus == "tidak berminat") newData[data].ignored = true
                    if(!tenderProject?.tender_statuses[2]?.dibuat_tanggal){
                        newData[data].successed = false
                        newData[data].inProgress = true
                    }
                    break
                }
            }
        }
        else if(currStatus == "kredit disetujui" || currStatus == "kredit gagal"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penyetujuan Kredit'){
                    if(currStatus == "kredit gagal") newData[data].ignored = true
                    if(!tenderProject?.tender_statuses[3]?.dibuat_tanggal){
                        newData[data].successed = false
                        newData[data].inProgress = true
                    }
                    break
                }
            }
        }
        return newData
    }
    function getProgressContent(){
        switch(contentIndex){
            case 0:
                return <TenderProgresPenawaran uploadFile={onUploadFilePenawaran} dataTender={tenderProject as TenderProjectModel} indexProgress={contentIndex}/>
            case 1:
                return <TenderProgresTindakLanjut uploadFile={onUploadFileFollowUp} updateText={setTextFollowUp} dataTender={tenderProject as TenderProjectModel} indexProgress={contentIndex}/>
            case 2:
                return <TenderProgresPengajuan 
                            onChangeChooseInterest= {onChangeChooseInterest}
                            selectedInterestOption= {isDebiturTertarik}
                            onChangeDiterimaSelect={onChangeChooseProduct} 
                            selectedDiterimaOption={produkDipilih} 
                            onChangeDiterimaText={onChangeNilaiKredit} 
                            tenderValue={nilaiKredit} 
                            onChangeDitolakText={onChangeFeedback} 
                            feedback={feedback}
                            tenderStatusData={indexStatusData as TenderStatusModel}
                        />
            case 3:
                return <TenderProgresPenyetujuan statusData={currStatusData as TenderStatusModel}/>
            default:
                return <TenderProgresPenawaran uploadFile={onUploadFilePenawaran} dataTender={tenderProject as TenderProjectModel} indexProgress={contentIndex}/>
        }
    }
    function getDisableNext(){
        if(currStatus == 'pemenang baru' && contentIndex>=0 && !filePenawaran){
            return true
        } else if (currStatus == 'penawaran' && contentIndex>=1 && (!fileFollowUp || textFollowUp.length==0)){
            return true
        } else if ((currStatus == 'pengajuan' || currStatus == "tidak berminat") && contentIndex>=2 && !(((produkDipilih.length>0 && nilaiKredit.length>0) || feedback.length>0) && !(indexStatusData?.produk_dipilih || indexStatusData?.feedback))){
            return true
        } else if ((currStatus == 'kredit disetujui' || currStatus == "kredit gagal") && contentIndex>=3){
            return true
        } else {
            return false
        }
    }

    const {uploadDataPenawaranAO, uploadDataFollowUpAO, updateDataDiterima, errorUpload} = useUploadData()
    const branchId = tenderProject?.branch_id
    //penawaran
    const [filePenawaran, setFilePenawaran] = useState<any|null>()
    const {ltd, lng} = useGeoLocation()
    function onUploadFilePenawaran(file:any){
        setFilePenawaran(file)
    }
    async function onSubmitFilePenawaran(){
        const formData = new FormData;
        formData.append("id", indexStatusData?.id as unknown as string);
        formData.append("tender_id", tenderProject?.id as unknown as string);
        formData.append("ltd_loc", ltd);
        formData.append("lng_loc", lng);
        formData.append("file_penawaran", filePenawaran as unknown as Blob);
        formData.append("branch_id", branchId as unknown as string);
        await uploadDataPenawaranAO(formData);
        if(!errorUpload){
            refresh()
            setFilePenawaran(null)
        } else{
            alert(errorUpload)
        }
    }

    //follow up
    const [fileFollowUp, setFileFollowUp] = useState<any|null>();
    const [textFollowUp, setTextFollowUp] = useState("");
    function onUploadFileFollowUp(file:any){
        setFileFollowUp(file)
    }
    async function onSubmitFileFollowUp(){
        const formData = new FormData;
        formData.append("id", indexStatusData?.id as unknown as string);
        formData.append("tender_id", tenderProject?.id as unknown as string);
        formData.append("ltd_loc", ltd);
        formData.append("lng_loc", lng);
        formData.append("file_follow_up", fileFollowUp as unknown as Blob);
        formData.append("text_follow_up", textFollowUp);
        formData.append("branch_id", branchId as unknown as string);
        await uploadDataFollowUpAO(formData);
        if(!errorUpload){
            refresh()
            setFileFollowUp(null)
        } else{
            alert(errorUpload)
        }
    }

    //pengajuan kredit
    const [isDebiturTertarik, setIsDebiturTertarik] = useState<string>("")
    const [produkDipilih, setProdukDipilih] = useState<string>("")
    const [nilaiKredit, setNilaiKredit] = useState<string>("")
    const [feedback, setFeedback] = useState<string>("")
    function onChangeChooseInterest(choose: string){
        setIsDebiturTertarik(choose)
    }
    function onChangeChooseProduct(product: string){
        setProdukDipilih(product)
    }
    function onChangeNilaiKredit(nilai: string){
        setNilaiKredit(nilai)
    }
    function onChangeFeedback(feedback: string){
        setFeedback(feedback)
    }
    async function onSubmitPengajuanKredit(){
        const tertarik = isDebiturTertarik=="Diterima"?true:false
        const submitData = {
            id: indexStatusData?.id as unknown as string,
            tender_id: tenderProject?.id as string,
            is_debitur_tertarik: tertarik,
            produk_dipilih: tertarik? produkDipilih : null,
            nilai_kredit: tertarik? nilaiKredit : null,
            feedback: !tertarik? feedback : null,
            branch_id: branchId as unknown as string
        }
        await updateDataDiterima(submitData);
        if(!errorUpload){
            refresh()
            setProdukDipilih("")
            setFeedback("")
        }
    }

    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            {
                loading ? (
                    <Loading/>
                ) : error ? (
                    <Response message={error} type={"error"} />
                ) : (
                    <div className="flex flex-col gap-4 h-full pb-6">
                        <Paper className="p-2 flex flex-col gap-4">
                            <BorderedBox className="text-sm flex flex-col gap-2">
                                <h2 className="font-bold">Detail Tender</h2>
                                <p>{tenderProject?.nama}</p>
                                <p className="text-xs text-blue-400">{tenderProject?.nama_pemenang}</p>
                                <p className="text-xs text-gray-500">Rp. {parseFloat(tenderProject?.nilai_tender as string).toLocaleString('id-ID')}</p>
                                <p className="text-xs">Pemenang Tender:</p>
                                <p className="text-xs text-gray-500">{tenderProject?.lokasi_pekerjaan}</p>
                            </BorderedBox>
                            <p className="text-sm font-bold">Progres</p>
                            <Progress items={getDataProgress()} visitedIndex={contentIndex}/>
                            {
                                getProgressContent()
                            }
                            <ProgressButton 
                                className="w-full"
                                progressIndex={contentIndex}
                                currStatus={currStatus as string}
                                setIndexPrev={contentPrev}
                                setIndexNext={contentNext}
                                dataTender={tenderProject as TenderProjectModel}
                                filePenawaran={filePenawaran}
                                uploadFile={onSubmitFilePenawaran}
                                fileFollowUp={fileFollowUp}
                                textFollowUp={textFollowUp}
                                updateFollowUp={onSubmitFileFollowUp}
                                produkDipilih= {produkDipilih}
                                nilaiTender= {nilaiKredit}
                                feedBack= {feedback}
                                sendPenawaran={onSubmitPengajuanKredit}                            
                                disabled={getDisableNext()} 
                            />
                        </Paper>
                    </div>
                )
            }
        </DashboardLayout>
    )
}