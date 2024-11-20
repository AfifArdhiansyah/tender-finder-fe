import Modal from "@/components/items/modals/modal"
import AOListTable from "../ao-tables/ao-list-table"
import AOListData from "@/constants/ao-list-dump-data"

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
    const tableColumns = ["nama", "nip", "status", "action"]
    const tableDatas = AOListData

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Pilih Account Officer"} subTitle={props.tenderName}>
            <div className="w-full">
                <AOListTable headers={tableHeads} columns={tableColumns} datas={tableDatas}/>
            </div>
        </Modal>
    )
}