import Modal from "@/components/items/modals/modal"
import TextLink from "@/components/items/links/text-link"
import { useUserContext } from "@/contexts/useUserContext"

interface MessageDetailModalProps{
    message: string,
    datetime: string,
    open: boolean,
    onCancel: Function,
    tenderId?: string|null
}

export default function MessageDetailModal(props: MessageDetailModalProps){
    function onModalClose(){
        props.onCancel()
    }
    const {user} = useUserContext()
    const role = user?.role
    function getPath(){
        if(role == 'ao'){
            return `/ao-tender/${props.tenderId}`
        }
        return `/tender/${props.tenderId}`
    }

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Message"}>
            <table className="table-auto mb-4 max-w-[50vw] max-lg:max-w-[80vw]">
                <tbody className="text-sm">
                    <tr>
                        <td className="py-2 font-bold">Pesan</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.message}</td>
                    </tr>
                    {
                        props.tenderId && (
                            <tr>
                                <td className="py-2 font-bold">Tender</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">
                                    <TextLink path={getPath()} type="primary">Lihat Tender #{props.tenderId}</TextLink>
                                </td>
                            </tr>
                        )
                    }
                    <tr>
                        <td className="py-2 font-bold">Tanggal</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">
                            {new Date(props.datetime).toLocaleString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    )
}