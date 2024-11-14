import TextButton from "../items/buttons/text-button"
import Button from "../items/buttons/button"

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
    function onShowClickedAO(){
        props.setSelectedTender(props.tenderName, props.tenderId, props.dataTender)
        props.showModalAO()
    }
    function onShowClickedTenderDetail(){
        props.setSelectedTender(props.tenderName, props.tenderId, props.dataTender)
        props.showModalTenderDetail()
    }
    switch(props.status){
        case "dalam proses":
            return <TextButton size="medium" type="alert" onClick={onShowClickedTenderDetail}>{props.status}</TextButton>
        case "selesai":
            return <TextButton size="medium" type="primary" onClick={onShowClickedTenderDetail}>{props.status}</TextButton>
        case "batal":
            return <TextButton size="medium" type="danger" onClick={onShowClickedTenderDetail}>{props.status}</TextButton>
        case "baru":
            return <Button type="alert" size="medium" onClick={onShowClickedAO}>tawarkan</Button>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{props.status}</Button>
    }
}