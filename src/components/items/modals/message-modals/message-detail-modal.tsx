import Modal from "../modal"

interface MessageDetailModalProps{
    dataMessage: any,
    open: boolean,
    onCancel: Function,
}

export default function MessageDetailModal(props: MessageDetailModalProps){
    function onModalClose(){
        props.onCancel()
    }

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Message"}>
            <table className="table-auto mb-4 max-w-[50vw] max-lg:max-w-[80vw]">
                <tbody className="text-sm">
                    <tr>
                        <td className="py-2 font-bold">Pesan</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataMessage.message}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Tanggal</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataMessage.datetime}</td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    )
}