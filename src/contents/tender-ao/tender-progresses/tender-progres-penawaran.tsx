import TransparentButton from "@/components/items/buttons/transparent-button"
import { FiDownload } from "react-icons/fi";
import FileUpload from "@/components/inputs/input-file";
import toast, {Toaster} from "react-hot-toast";

export default function TenderProgresPenawaran(){
    function downloadFile(){
        toast.success("Downloaded!")
    }
    function uploadFile(){
        toast.success("File uploaded!")
    }
    return(
        <div className="flex flex-col gap-4 text-xs">
            <Toaster/>
            <p className="font-bold">Download Surat Penawaran:</p>
            <TransparentButton className="border px-3 py-2 rounded-lg text-blue-500 flex justify-between items-center" hoverBGColor={""} hoverTextColor={""} onClick={()=>{downloadFile()}}>
                Download dokumen surat penawaran
                <FiDownload className="text-black" size={16}/>
            </TransparentButton>
            <p className="font-bold">Upload Dokumen Tanda Terima:</p>
            <FileUpload onFileUpload={()=>{uploadFile()}} label="Upload Dokumen" placeholder="upload dokumen tanda terima"/>
        </div>
    )
}