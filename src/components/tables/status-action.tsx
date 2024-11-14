import TextLink from "../items/links/text-link"
import Button from "../items/button"

interface StatusActionInterface{
    tenderId: string,
    tenderName: string
    status: string,
    isOpenModal: boolean,
    showModal: Function,
    closeModal: Function,
    setSelectedTender: Function
}

export default function StatusAction(props: StatusActionInterface){
    function onShowClicked(){
        props.setSelectedTender(props.tenderName, props.tenderId)
        props.showModal()
    }
    switch(props.status){
        case "dalam proses":
            return <TextLink path={"/tender/"+props.tenderId} type="alert">{props.status}</TextLink>
        case "selesai":
            return <TextLink path={"/tender/"+props.tenderId} type="primary">{props.status}</TextLink>
        case "batal":
            return <TextLink path={"/tender/"+props.tenderId} type="danger">{props.status}</TextLink>
        case "baru":
            return <Button type="alert" size="medium" onClick={onShowClicked}>tawarkan</Button>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{props.status}</Button>
    }
}