'use client'

import Modal from "@/components/items/modals/modal"
import AOListTable from "../ao-tables/ao-list-table"
import { useAOs } from "@/hooks/useAO"
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response"
import { TenderProjectModel } from "@/models/tender-project-model"

interface ChooseAOModalProps{
    tenderName: string,
    open: boolean,
    onCancel: ()=>void,
    dataTender: TenderProjectModel
    refreshTable: ()=>void
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
                    <div className="w-full overflow-y-auto max-h-[70vh]">
                        <AOListTable headers={tableHeads} columns={tableColumns} datas={aos} dataTender={props.dataTender} refreshTable={props.refreshTable}/>
                    </div>
                )
            }
        </Modal>
    )
}