import TextButton from "@/components/items/buttons/text-button"
import Button from "@/components/items/buttons/button"
import { useRouter } from "next/navigation"

interface StatusActionInterface{
    tenderId: string,
    tenderName: string
    status: string,
    isOpenModalAO: boolean,
    isOpenModalTenderDetail: boolean,
    showModalAO: Function,
    showModalTenderDetail: Function,
    closeModalAO: Function,
    closeModalTenderDetail: Function,
    setSelectedTender: Function
    dataTender?: any
}

export default function StatusAction(props: StatusActionInterface){
    const router = useRouter()
    function onShowClickedAO(){
        props.setSelectedTender(props.tenderName, props.tenderId, props.dataTender)
        props.showModalAO()
    }
    function onShowClickedTenderDetail(){
        props.setSelectedTender(props.tenderName, props.tenderId, props.dataTender)
        props.showModalTenderDetail()
    }
    function goToDetail(){
        router.push("/tender/"+props.tenderId)
    }
    switch(props.status){
        case "dalam proses":
            return <TextButton size="medium" type="alert" onClick={goToDetail}>{props.status}</TextButton>
        case "selesai":
            return <TextButton size="medium" type="primary" onClick={goToDetail}>{props.status}</TextButton>
        case "batal":
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{props.status}</TextButton>
        case "baru":
            return <Button type="alert" size="medium" onClick={onShowClickedAO}>tawarkan</Button>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{props.status}</Button>
    }
}