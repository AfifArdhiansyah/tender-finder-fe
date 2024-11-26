import FileUpload from "@/components/inputs/input-file";
import InputText from "@/components/inputs/input-text";
import toast, {Toaster} from "react-hot-toast";

export default function TenderProgresTindakLanjut(){
    function uploadFile(){
        toast.success("File uploaded!")
    }
    return(
        <div className="flex flex-col gap-4 text-xs">
            <Toaster/>
            <p className="font-bold">Upload Foto Follow Up:</p>
            <FileUpload onFileUpload={()=>{uploadFile()}} label="Upload Foto" placeholder="upload foto telah follow up"/>
            <InputText className="min-h-[70px]" placeholder="Tulis apa progess apa saja yang sudah di lakukan..."/>
        </div>
    )
}