import Modal from "@/components/items/modals/modal"
import AOListTable from "../ao-tables/ao-list-table"
import AOListData from "@/constants/ao-list-dump-data"
import { useAOs } from "@/hooks/useAO"
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response"

interface ChooseAOModalProps{
    tenderName: string,
    open: boolean,
    onCancel: Function,
}

export default function ChooseAOModal(props: ChooseAOModalProps){
    function onModalClose(){
        props.onCancel()
    }

    const tableHeads = ["Nama", "NIP", "Status", "Action"]
    const tableColumns = ["nama", "nip", "is_active", "action"]

    const {aos, loading, error} = useAOs()

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Pilih Account Officer"} subTitle={props.tenderName}>
            {
                loading ? (
                    <Loading/>
                ) : error? (
                    <Response message={error as string} type={"error"}/>
                ) : (
                    <div className="w-full">
                        <AOListTable headers={tableHeads} columns={tableColumns} datas={aos as any[]}/>
                    </div>
                )
            }
        </Modal>
    )
}