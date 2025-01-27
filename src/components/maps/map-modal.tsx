
import Modal from "../items/modals/modal";
import GoogleMaps from "./google.maps";

interface MapModalProps{
    isOpenModal: boolean,
    onCancel: () => void,
    title?: string,
    subTitle?: string,
    latitude: number,
    longitude: number
}

export function MapModal(props: MapModalProps){
    return(
        <Modal open={props.isOpenModal} onCancel={props.onCancel} title={props.title} subTitle={props.subTitle}>
            <GoogleMaps latitude={props.latitude} longitude={props.longitude}/>
        </Modal>
    )
}