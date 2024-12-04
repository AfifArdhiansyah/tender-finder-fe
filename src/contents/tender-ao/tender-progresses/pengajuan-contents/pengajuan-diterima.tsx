'use client'

import { useState } from "react"
import Dropdown from "@/components/items/dropdowns/dropdown"
import InputText from "@/components/inputs/input-text"

interface PengajuanDiterimaProps{
    onChangeSelect: Function,
    selectedOption: string,
    onChangeText: Function,
    tenderValue: string
}

export default function PengajuanDiterima(props: PengajuanDiterimaProps){
    const options = ["KMKK (Kredit Modal Kerja Kontrak)", "Garansi Bank"]
    function onChangeSelect(selected:string){
        props.onChangeSelect(selected)
    }
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.onChangeText(value)
    };
    return(
        <div className="flex flex-col gap-4">
            <p className="font-bold">Produk yang ditawarkan:</p>
            <Dropdown label={"Produk yang ditawarkan"} options={options} onSelect={(selected)=>onChangeSelect(selected)}/>
            <p className="font-bold">Besaran Penawaran:</p>
            <InputText placeholder="Rp. xxx.xxx.xxx" onChange={onChangeText} value={props.tenderValue}/>
        </div>
    )
}