import Modal from "@/components/items/modals/modal";
import Image from "next/image";

interface FotoModalProgressProps{
    url?: string
    isOpen: boolean
    onClose: Function
    title?: string
    subTitle?: string
}

export default function FotoModalProgress(props: FotoModalProgressProps){
    return(
        <Modal open={props.isOpen} onCancel={props.onClose} title={props.title} subTitle={props.subTitle} className="">
            <div className="w-full flex justify-center max-h-[70vh] overflow-x-auto">
                {
                    (props.url && props.url.length > 0) && <Image src={props.url} alt="foto progress" className="w-full h-full" width={700} height={700}/>
                }
            </div>
        </Modal>
    )
}