
import Modal from "../items/modals/modal";
import MapMini from "./map-mini";

interface MapModalProps{
    isOpenModal: boolean,
    onCancel: Function,
    title?: string,
    subTitle?: string,
    latitude: number,
    longitude: number
}

export function MapModal(props: MapModalProps){
    return(
        <Modal open={props.isOpenModal} onCancel={props.onCancel} title={props.title} subTitle={props.subTitle}>
            <MapMini latitude={props.latitude} longitude={props.longitude}/>
        </Modal>
    )
}