import TransparentButton from "@/components/items/buttons/transparent-button"
import { FiDownload } from "react-icons/fi";
import FileUpload from "@/components/inputs/input-file";
import { TenderProjectModel } from "@/models/tender-project-model";
import PdfViewer from "@/components/files/pdf-viewer";
import UseFile from "@/hooks/useFile";

interface TenderProgresPenawaranProps{
    uploadFile: (file:File, tenderStatusId:number)=>void
    dataTender: TenderProjectModel
    indexProgress: number
}

export default function TenderProgresPenawaran(props: TenderProgresPenawaranProps){
    const {handleDownloadPenawaran} = UseFile()
    async function downloadFile(){
        await handleDownloadPenawaran(props.dataTender.id, props.dataTender.lokasi_pekerjaan) //change lokasi pekerjaan
    }
    function uploadFile(file:File){
        props.uploadFile(file, props.dataTender.tender_statuses[props.indexProgress].id)
    }
    return(
        <div className="flex flex-col gap-4 text-xs pb-2">
            <p className="font-bold">Download Surat Penawaran:</p>
            <TransparentButton className="border px-3 py-2 rounded-lg text-blue-500 flex justify-between items-center" hoverBGColor={""} hoverTextColor={""} onClick={()=>{downloadFile()}}>
                Download dokumen surat penawaran
                <FiDownload className="text-black" size={16}/>
            </TransparentButton>
            <p className="font-bold">Upload Dokumen Tanda Terima:</p>
            {
                props.dataTender.tender_statuses[props.indexProgress]?.penawaran_file ? (
                    <PdfViewer url={props.dataTender.tender_statuses[props.indexProgress]?.penawaran_file as string} height="350px"/>
                ) : (
                    <FileUpload onFileUpload={uploadFile} label="Upload Dokumen" placeholder="upload dokumen tanda terima" onlyPdf/>
                )
            }
        </div>
    )
}