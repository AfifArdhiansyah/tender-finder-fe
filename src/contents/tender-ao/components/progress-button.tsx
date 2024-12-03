import Button from "@/components/items/buttons/button"
import { TenderProjectModel } from "@/models/tender-project-model"

interface ProgressButtonProps{
    progressIndex: number
    setIndexPrev: Function
    setIndexNext: Function
    dataTender: TenderProjectModel
    uploadFile: Function
    filePenawaran?: any
    disabled?: boolean
    className?: string
}

export default function ProgressButton(props: ProgressButtonProps){
    function handlePrev(){
        props.setIndexPrev()
    }
    function handleNext(){
        if(props.filePenawaran && !props.dataTender.tender_statuses[props.progressIndex]?.penawaran_file){
            props.uploadFile()
        }
        props.setIndexNext()
    }
    return(
        <div className={"flex gap-2 "+props.className}>
            {props.progressIndex!=0 && <Button className="w-full" type={"general"} size={"small"} onClick={()=>handlePrev()}>sebelumnya</Button>}
            {props.progressIndex!=3 && <Button className="w-full" type={props.disabled?"disable":"primary"} size={"small"} onClick={()=>handleNext()} disabled={props.disabled}>lanjut</Button>}
        </div>
    )
}