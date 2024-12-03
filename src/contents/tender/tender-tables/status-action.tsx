import TextButton from "@/components/items/buttons/text-button"
import Button from "@/components/items/buttons/button"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"

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
    const {role} = useUser()
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
        case "pemenang baru":
            if(props.dataTender?.account_officer?.id) return <TextButton size="medium" type="success" onClick={goToDetail}>{props.status}</TextButton>
            return <Button type={role=="manager-cabang"?"alert":"disable"} size="medium" onClick={onShowClickedAO} disabled={role=="manager-cabang"?false:true}>{role=="manager-cabang"?"tawarkan":"tender baru"}</Button>
        case "penawaran":
            return <TextButton size="medium" type="alert" onClick={goToDetail}>{props.status}</TextButton>
        case "tidak berminat":
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{props.status}</TextButton>
        case "pengajuan":
            return <TextButton size="medium" type="alert" onClick={goToDetail}>{props.status}</TextButton>
        case "kredit disetujui":
            return <TextButton size="medium" type="primary" onClick={goToDetail}>{props.status}</TextButton>
        case "kredit ditolak":
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{props.status}</TextButton>
        case "kredit gagal":
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{props.status}</TextButton>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{props.status}</Button>
    }
}