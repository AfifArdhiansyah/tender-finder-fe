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
    const { tenderProject, loading, error } = useGetTenderById(id as string);
    const currStatus = tenderProject?.tender_statuses[tenderProject.tender_statuses.length-1].status.nama
    const dataProgress = [
        {label:"Penawaran", successed:false, ignored: false},
        {label:"Tindak Lanjut", successed:false, ignored: false},
        {label:"Mengajukan Kredit", successed:false, ignored: false},
        {label:"Penyetujuan Kredit", successed:false, ignored: false},
    ]
    function getDataProgress(){
        const newData = dataProgress
        if(currStatus == 'pemenang baru'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penawaran'){
                    break
                }
            }
        }
        else if(currStatus == "penawaran"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Tindak Lanjut'){
                    break
                }
            }
        }
        else if(currStatus == "pengajuan" || currStatus == "tidak berminat"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Mengajukan Kredit'){
                    if(currStatus == "tidak berminat") newData[data].ignored = true
                    break
                }
            }
        }
        else if(currStatus == "kredit disetujui" || currStatus == "kredit gagal"){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penyetujuan Kredit'){
                    if(currStatus == "kredit gagal") newData[data].ignored = true
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
                return <TenderProgresTindakLanjut/>
            case 2:
                return <TenderProgresPengajuan/>
            case 3:
                return <TenderProgresPenyetujuan/>
            default:
                return <TenderProgresPenawaran uploadFile={onUploadFilePenawaran} dataTender={tenderProject as TenderProjectModel} indexProgress={contentIndex}/>
        }
    }
    function getAllowNext(){
        if(currStatus == 'pemenang baru' && contentIndex==0 && !filePenawaran){
            return true
        } else if (currStatus == 'penawaran' && contentIndex==1){
            return true
        } else if ((currStatus == 'pengajuan' || currStatus == "tidak berminat") && contentIndex==2){
            return true
        } else if ((currStatus == 'kredit disetujui' || currStatus == "kredit gagal") && contentIndex==3){
            return true
        } else {
            return false
        }
    }

    //penawaran
    const [filePenawaran, setFilePenawaran] = useState()
    const {uploadDataPenawaranAO} = useUploadData()
    function onUploadFilePenawaran(file:any){
        setFilePenawaran(file)
    }
    function onSubmitFilePenawaran(){
        const formData = new FormData;
        formData.append(
            "file_penawaran", filePenawaran as unknown as Blob
        );
        formData.append("id", tenderProject?.tender_statuses[contentIndex].id as unknown as string);
        uploadDataPenawaranAO(formData);
    }
    

    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            {
                loading ? (
                    <Loading/>
                ) : error ? (
                    <Response message={error} type={"error"} />
                ) : (
                    <div className="flex flex-col gap-4 h-full">
                        <Paper className="p-2 flex flex-col gap-4">
                            <BorderedBox className="text-sm flex flex-col gap-2">
                                <h2 className="font-bold">Biodata Tender</h2>
                                <p>{tenderProject?.nama}</p>
                                <p className="text-xs text-blue-400">{tenderProject?.nama_pemenang}</p>
                                <p className="text-xs text-gray-500">Rp. {parseFloat(tenderProject?.nilai_tender as string).toLocaleString('id-ID')}</p>
                                <p className="text-xs">Alamat Tender:</p>
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
                                setIndexPrev={contentPrev} 
                                setIndexNext={contentNext} 
                                dataTender={tenderProject as TenderProjectModel}
                                filePenawaran={filePenawaran} 
                                disabled={getAllowNext()}
                                uploadFile={onSubmitFilePenawaran}
                            />
                        </Paper>
                    </div>
                )
            }
        </DashboardLayout>
    )
}