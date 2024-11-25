'use client'

import DashboardLayout from "@/layouts/dashboard-layout"
import { SidebarNavigatorAO } from "@/constants/navigator"
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb"
import { useParams } from "next/navigation"
import Paper from "@/components/frames/papes"
import BorderedBox from "@/components/boxes/bordered-box"
import { TenderAODumpData } from "@/constants/tender-ao/teder-ao-data"
import { useState } from "react"
import Progress from "@/components/progresses/progress"

export default function AOTenderDetail(){
    const index = 1
    const role = 'ao'
    const { id } = useParams();
    const bcItems = [
        {label: SidebarNavigatorAO[index].name, path: SidebarNavigatorAO[index].ref},
        {label: "Progres Tender", path: SidebarNavigatorAO[index].ref+"/"+id}
    ] as BreadcrumbItem[]
    const [tenderData, setTenderData] = useState(TenderAODumpData.find((tender)=>tender.id==id))
    const dataProgress = [
        {label:"Penawaran", successed:false},
        {label:"Tindak Lanjut", successed:false},
        {label:"Mengajukan Kredit", successed:false},
        {label:"Penyetujuan Kredit", successed:false},
    ]
    function getDataProgress(){
        const newData = dataProgress
        if(tenderData?.status == 'baru'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penawaran'){
                    break
                }
            }
        }
        else if(tenderData?.status == 'dalam-penawaran'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Tindak Lanjut'){
                    break
                }
            }
        }
        else if(tenderData?.status == 'mengajukan-kredit'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Mengajukan Kredit'){
                    break
                }
            }
        }
        else if(tenderData?.status == 'penawaran-ditolak'){
            for(const data in dataProgress){
                newData[data].successed = true
                if(dataProgress[data].label == 'Penyetujuan Kredit'){
                    break
                }
            }
        }
        return newData
    }
    return(
        <DashboardLayout sideNavIndex={index} bcItems={bcItems} role={role}>
            <div className="flex flex-col gap-4 h-full">
                <Paper className="p-2 flex flex-col gap-2">
                    <BorderedBox className="text-sm flex flex-col gap-2">
                        <h2 className="font-bold">Biodata Tender</h2>
                        <p>{tenderData?.nama}</p>
                        <p className="text-xs text-blue-400">{tenderData?.nama_pemenang}</p>
                        <p className="text-xs text-gray-500">Rp. {parseFloat(tenderData?.nilai_tender as string).toLocaleString('id-ID')}</p>
                        <p className="text-xs">Alamat Tender:</p>
                        <p className="text-xs text-gray-500">{tenderData?.alamat_pemenang}</p>
                    </BorderedBox>
                    <p className="text-sm font-bold">Progres</p>
                    <Progress items={getDataProgress()} visitedIndex={0}/>
                </Paper>
            </div>
        </DashboardLayout>
    )
}