import TransparentButton from "@/components/items/buttons/transparent-button"
import { FiDownload } from "react-icons/fi";
import FileUpload from "@/components/inputs/input-file";

export default function TenderProgresPenawaran(){
    return(
        <div className="flex flex-col gap-4 text-xs">
            <p className="font-bold">Download Surat Penawaran:</p>
            <TransparentButton className="border px-3 py-2 rounded-lg text-blue-500 flex justify-between items-center" hoverBGColor={""} hoverTextColor={""} onClick={()=>{alert("donwload!")}}>
                Download dokumen surat penawaran
                <FiDownload className="text-black" size={16}/>
            </TransparentButton>
            <p className="font-bold">Upload Dokumen Tanda Terima:</p>
            <FileUpload onFileUpload={function (file: File): void {
                throw new Error("Function not implemented.");
            } }/>
        </div>
    )
}