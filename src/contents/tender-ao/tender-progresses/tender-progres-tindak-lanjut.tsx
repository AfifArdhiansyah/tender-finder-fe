import FileUpload from "@/components/inputs/input-file";
import InputTextArea from "@/components/inputs/input-text-area";
import { TenderProjectModel } from "@/models/tender-project-model";
import Image from "next/image";

interface TenderProgresTindakLanjutProps{
    uploadFile: Function
    updateText: Function
    dataTender: TenderProjectModel
    indexProgress: number
}

export default function TenderProgresTindakLanjut(props: TenderProgresTindakLanjutProps){
    function handleTextChange(text: string){
        props.updateText(text, props.dataTender.tender_statuses[props.indexProgress].id)
    }
    function uploadFile(file: any){
        props.uploadFile(file, props.dataTender.tender_statuses[props.indexProgress].id)
    }
    return(
        <div className="flex flex-col gap-4 text-xs">
            <p className="font-bold">Upload Foto Follow Up:</p>
            {
                props.dataTender.tender_statuses[props.indexProgress]?.bukti_file ? (
                    <Image src={props.dataTender.tender_statuses[props.indexProgress]?.bukti_file as string} width={200} height={200} alt="image follow up"/>
                ) : (
                    <FileUpload onFileUpload={uploadFile} label="Upload Foto" placeholder="upload foto telah follow upa"/>
                )
            }
            <InputTextArea 
                onChange={handleTextChange} 
                className="min-h-[70px]" 
                placeholder="Tulis apa progess apa saja yang sudah di lakukan..." 
                value={props.dataTender.tender_statuses[props.indexProgress]?.keterangan}
            />
        </div>
    )
}