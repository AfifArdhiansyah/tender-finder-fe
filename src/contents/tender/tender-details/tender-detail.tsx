import TenderDetailTable from "./tender-detail-table"
import ProgressTrack from "./progress-track/progress-track"
import { useGetTenderById } from "@/hooks/useTenderProjects"
import Loading from "@/components/items/progress/loading";
import Response from "@/components/items/responses/response";
import { TenderStatusModel } from "@/models/tender-status-model";

interface TenderDetailContentProps{
    idTender: string
}

export default function TenderDetailContent(props: TenderDetailContentProps){
    const { tenderProject, loading, error, refresh } = useGetTenderById(props.idTender);
    return(
        <>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <Response message={error} type={"error"} />
                ) : (
                    <div className="flex flex-col gap-4 pb-6">
                        <h2 className="font-bold text-xl">Progres Tender</h2>
                        <TenderDetailTable tenderProject={tenderProject} idTender={props.idTender}/>
                        <hr />
                        <h2 className="font-bold text-xl">Tracking</h2>
                        <ProgressTrack datas={tenderProject?.tender_statuses as TenderStatusModel[]} branchId={tenderProject?.branch_id as number} nilaiTender={tenderProject?.nilai_tender as string} tender_ltd={tenderProject?.ltd_loc as string} tender_lng={tenderProject?.lng_loc as string} refresh={refresh}/>
                    </div>
                )
            }
        </>
    )
}