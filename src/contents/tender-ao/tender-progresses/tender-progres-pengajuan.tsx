'use client'

import Dropdown from "@/components/items/dropdowns/dropdown"
import PengajuanDiterima from "./pengajuan-contents/pengajuan-diterima"
import PengajuanDitolak from "./pengajuan-contents/pengajuan-ditolak"
import { TenderStatusModel } from "@/models/tender-status-model"
import Image from "next/image"
import BorderedBox from "@/components/boxes/bordered-box"

interface TenderProgresPenyetujuanProps{
    onChangeChooseInterest: (selected:string) => void,
    selectedInterestOption: string,
    onChangeDiterimaSelect: (selected:string) => void,
    selectedDiterimaOption: string,
    onChangeDiterimaText: (value: string) => void,
    tenderValue: string
    onChangeDitolakText: (value: string) => void,
    feedback: string,
    tenderStatusData: TenderStatusModel
}

export default function TenderProgresPenyetujuan(props: TenderProgresPenyetujuanProps){
    const options = ["Diterima", "Tidak Diterima"]
    function onChangeSelect(selected:string){
        props.onChangeChooseInterest(selected)
    }
    return(
        <div className="flex flex-col gap-4 text-xs">
            <p className="font-bold">Penawaran:</p>
            {
                (props.tenderStatusData.produk_dipilih || props.tenderStatusData.feedback) ? (
                    <BorderedBox className="flex flex-col gap-2">
                        {
                            props.tenderStatusData.status.nama == 'tidak berminat' ? <>
                                <div className="flex gap-2 items-center">
                                    <Image src={"/icons/ignore.svg"} alt={"ignored"} width={20} height={20} />
                                    <p>Penawaran Ditolak Calon Debitur</p>
                                </div>
                                <p className="text-gray-500">{props.tenderStatusData.feedback}</p>
                            </> : <>
                                <div className="flex gap-2 items-center">
                                    <Image src={"/icons/check.svg"} alt={"accepted"} width={20} height={20} />
                                    <p>Penawaran Disetujui Calon Debitur</p>
                                </div>
                                <p className="text-gray-500">{props.tenderStatusData.produk_dipilih}</p>
                                <p className="text-gray-500">Rp. {parseFloat(props.tenderStatusData.nilai_kredit as string).toLocaleString('id-ID')}</p>
                            </>
                        }
                    </BorderedBox>
                ) : (
                    <>
                        <Dropdown label={"Status Penawaran"} options={options} onSelect={(selected)=>onChangeSelect(selected)}/>
                        {
                            props.selectedInterestOption=="Diterima" && (
                                <PengajuanDiterima 
                                    onChangeSelect={props.onChangeDiterimaSelect} 
                                    selectedOption={props.selectedDiterimaOption} 
                                    onChangeText={props.onChangeDiterimaText} 
                                    tenderValue={props.tenderValue} 
                                />
                            )
                            ||
                            props.selectedInterestOption=="Tidak Diterima" && (
                                <PengajuanDitolak onChangeText={props.onChangeDitolakText} feedback={props.feedback}/>
                            )
                        }
                    </>
                )
            }
            
        </div>
    )
}