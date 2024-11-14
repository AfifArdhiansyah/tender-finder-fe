import Modal from "./modal"

interface ChooseAOModalProps{
    tenderName: string,
    open: boolean,
    onCancel: Function,
}

export default function ChooseAOModal(props: ChooseAOModalProps){
    function onModalClose(){
        props.onCancel()
    }

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Pilih Account Officer"} subTitle={props.tenderName}>
            <div>
                <p>ini konteng</p>
            </div>
        </Modal>
    )
}