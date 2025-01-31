'use client'

import Dropdown from "@/components/items/dropdowns/dropdown"
import InputText from "@/components/inputs/input-text"
import { stringToIdrFormat } from "@/services/formatIDR"

interface PengajuanDiterimaProps{
    onChangeSelect: (selected:string) => void,
    selectedOption: string,
    onChangeText: (value: string) => void,
    tenderValue: string
}

export default function PengajuanDiterima(props: PengajuanDiterimaProps){
    const options = ["KMKK (Kredit Modal Kerja Kontrak)", "Garansi Bank"]
    function onChangeSelect(selected:string){
        props.onChangeSelect(selected)
    }
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        props.onChangeText(stringToIdrFormat(value));
    };
    return(
        <div className="flex flex-col gap-4">
            <p className="font-bold">Produk yang ditawarkan:</p>
            <Dropdown label={"Produk yang ditawarkan"} options={options} onSelect={(selected)=>onChangeSelect(selected)}/>
            <p className="font-bold">Besaran Penawaran:</p>
            <InputText prefix="Rp." placeholder="Masukkan jumlah kredit yang akan diajukan" onChange={onChangeText} value={props.tenderValue}/>
        </div>
    )
}