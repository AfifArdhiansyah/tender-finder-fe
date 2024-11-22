import TenderDetailTable from "./tender-detail-table"
import ProgressTrack from "./progress-track/progress-track"
import { TenderTrackDumpData } from "@/constants/tender/tender-track-data"

interface TenderDetailContentProps{
    idTender: string
}

export default function TenderDetailContent(props: TenderDetailContentProps){
    return(
        <div className="flex flex-col gap-4 pb-6">
            <h2 className="font-bold text-xl">Progres Tender</h2>
            <TenderDetailTable idTender={props.idTender}/>
            <hr />
            <h2 className="font-bold text-xl">Tracking</h2>
            <ProgressTrack datas={TenderTrackDumpData}/>
        </div>
    )
}