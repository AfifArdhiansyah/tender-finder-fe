'use client'

import { useState } from "react"
import Dropdown from "@/components/items/dropdowns/dropdown"
import InputText from "@/components/inputs/input-text"

export default function PengajuanDiterima(){
    const [selectedOption, setSelectedOption] = useState("Produk yang ditawarkan")
    const options = ["KMKK (Kredit Modal Kerja Kontrak)", "Garansi Bank"]
    return(
        <div className="flex flex-col gap-4">
            <p className="font-bold">Produk yang ditawarkan:</p>
            <Dropdown label={"Produk yang ditawarkan"} options={options} onSelect={(selected)=>setSelectedOption(selected)}/>
            <p className="font-bold">Besaran Penawaran:</p>
            <InputText placeholder="Rp. xxx.xxx.xxx"/>
        </div>
    )
}