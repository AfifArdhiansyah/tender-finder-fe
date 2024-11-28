'use client'

import { useState } from "react"
import Dropdown from "@/components/items/dropdowns/dropdown"
import PengajuanDiterima from "./pengajuan-contents/pengajuan-diterima"
import PengajuanDitolak from "./pengajuan-contents/pengajuan-ditolak"

export default function TenderProgresPenyetujuan(){
    const [selectedOption, setSelectedOption] = useState("")
    const options = ["Diterima", "Tidak Diterima"]
    return(
        <div className="flex flex-col gap-4 text-xs">
            <p className="font-bold">Penawaran:</p>
            <Dropdown label={"Status Penawaran"} options={options} onSelect={(selected)=>setSelectedOption(selected)}/>
            {
                selectedOption=="Diterima" && (
                    <PengajuanDiterima/>
                )
                ||
                selectedOption=="Tidak Diterima" && (
                    <PengajuanDitolak/>
                )
            }
        </div>
    )
}