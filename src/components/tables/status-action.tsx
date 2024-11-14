import TextLink from "../items/links/text-link"
import Button from "../items/button"

interface StatusActionInterface{
    tenderId: string,
    status: string
}

export default function StatusAction(props: StatusActionInterface){
    switch(props.status){
        case "dalam proses":
            return <TextLink path={"/tender/"+props.tenderId} type="alert">{props.status}</TextLink>
        case "selesai":
            return <TextLink path={"/tender/"+props.tenderId} type="primary">{props.status}</TextLink>
        case "baru":
            return <Button type="alert" size="medium" onClick={()=>{}}>tawarkan</Button>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{props.status}</Button>
    }
}