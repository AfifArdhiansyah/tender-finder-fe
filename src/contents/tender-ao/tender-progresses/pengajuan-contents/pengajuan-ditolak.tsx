
import InputTextArea from "@/components/inputs/input-text-area"

interface PengajuanDitolakProps{
    onChangeText: (text:string) => void
    feedback: string
}

export default function PengajuanDitolak(props: PengajuanDitolakProps){
    function onChangeText(text:string){
        props.onChangeText(text)
    }
    return(
        <div className="flex flex-col gap-4">
            <p className="font-bold">Feedback:</p>
            <InputTextArea placeholder="Alasan calon debitur menolak penawaran kredit..." onChange={onChangeText} value={props.feedback}/>
        </div>
    )
}