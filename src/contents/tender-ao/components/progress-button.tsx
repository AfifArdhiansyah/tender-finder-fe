import Button from "@/components/items/buttons/button"
import { TenderProjectModel } from "@/models/tender-project-model"

interface ProgressButtonProps{
    progressIndex: number
    currStatus: string
    setIndexPrev: Function
    setIndexNext: Function
    dataTender: TenderProjectModel
    uploadFile: Function
    updateFollowUp: Function
    filePenawaran?: any
    fileFollowUp?: any
    textFollowUp?: string
    produkDipilih: string
    nilaiTender: string
    feedBack: string
    sendPenawaran: Function
    disabled?: boolean
    className?: string
}

export default function ProgressButton(props: ProgressButtonProps){
    function handlePrev(){
        props.setIndexPrev()
    }
    function isSubmitButton(){
        if(props.progressIndex==0 && (props.filePenawaran || props.currStatus=="pemenang baru")){
            return true
        }
        else if(props.progressIndex==1 && ((props.fileFollowUp && props.textFollowUp) || props.currStatus=="penawaran" )){
            return true
        }
        else if(props.progressIndex==2 && ((props.produkDipilih.length>0 && props.nilaiTender.length>0) || props.feedBack.length>0 || (props.currStatus=="pengajuan" || props.currStatus=="tidak berminat"))){
            return true
        }
        return false
    }
    const currStatusData = props.dataTender.tender_statuses[props.progressIndex]
    function handleNext(){
        if(props.filePenawaran && !currStatusData?.penawaran_file){
            props.uploadFile()
        }
        else if(props.fileFollowUp && props.textFollowUp && !currStatusData?.bukti_file){
            props.updateFollowUp()
        }
        else if(((props.produkDipilih && props.nilaiTender) || props.feedBack) && (!currStatusData?.bukti_file && !currStatusData?.feedback)){
            props.sendPenawaran()
        }
        else{
            props.setIndexNext()
        }
    }
    return(
        <div className={"flex gap-2 "+props.className}>
            {props.progressIndex!=0 && <Button className="w-full" type={"general"} size={"small"} onClick={()=>handlePrev()}>sebelumnya</Button>}
            {props.progressIndex!=3 && <Button className="w-full" type={props.disabled?"disable":"primary"} size={"small"} onClick={()=>handleNext()} disabled={props.disabled}>{isSubmitButton()?"submit":"lanjut"}</Button>}
        </div>
    )
}