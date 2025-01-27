import Modal from "../items/modals/modal";
import PdfViewer from "./pdf-viewer";

interface PdfModalProps{
    isOpenModal: boolean,
    onCancel: () => void,
    title?: string,
    subTitle?: string,
    url: string,
}

export function PdfModal(props: PdfModalProps){
    return(
        <Modal open={props.isOpenModal} onCancel={props.onCancel} title={props.title} subTitle={props.subTitle}>
            <PdfViewer url={props.url}/>
        </Modal>
    )
}