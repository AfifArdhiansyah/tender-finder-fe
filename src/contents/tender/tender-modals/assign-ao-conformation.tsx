import Modal from "@/components/items/modals/modal";
import { useAssignAO } from "@/hooks/useTenderProjects";

interface AssignAOConfirmationProps{
    tenderName: string,
    tenderId: string,
    aoName: string,
    aoID: number,
    open: boolean,
    onCancel: Function,
}

export default function AssignAOConfirmation(props: AssignAOConfirmationProps) {
    const {assignAOToTender, error} = useAssignAO()
    function onModalClose(){
        props.onCancel()
    }
    async function onConfirm(){
        await assignAOToTender(props.tenderId, props.aoID)
        if(!error){
            props.onCancel()
            window.location.reload()
        }else{
            alert(error as string)
        }
    }
    return (
        <Modal className="w-[50vw]" open={props.open} onCancel={onModalClose} title={"Perintahkan AO"} useFooterAction confirmAction={onConfirm}>
            <div className="flex flex-col gap-4">
                <p className="text-gray-500">Apakah anda yakin ingin mengirimkan tender <span className="font-bold">{props.tenderName}</span> ke <span className="font-bold">{props.aoName}</span>?</p>
            </div>
        </Modal>
    )
}