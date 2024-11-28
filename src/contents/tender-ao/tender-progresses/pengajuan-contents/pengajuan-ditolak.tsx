
import InputTextArea from "@/components/inputs/input-text-area"

export default function PengajuanDitolak(){
    return(
        <div className="flex flex-col gap-4">
            <p className="font-bold">Feedback:</p>
            <InputTextArea placeholder="Alasan calon debitur menolak penawaran kredit..."/>
        </div>
    )
}