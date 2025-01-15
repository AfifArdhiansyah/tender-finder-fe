'use client'

import TextButton from "@/components/items/buttons/text-button"
import Button from "@/components/items/buttons/button"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"

interface StatusActionInterface{
    tenderId: string,
    tenderName: string
    status: string,
    latestStatus: number,
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
    
    switch(props.latestStatus){
        case 1:
            if(!props.dataTender?.account_officer?.id){
                return <div className="flex gap-2">
                    <TextButton size="medium" type="success" onClick={goToDetail}>{"tender baru"}</TextButton>
                    {
                        !(props.dataTender?.account_officer?.id) && <Button type={role=="manager-cabang"?"alert":"disable"} size="medium" onClick={onShowClickedAO} disabled={role=="manager-cabang"?false:true}>{role=="manager-cabang"?"tawarkan":"tender baru"}</Button>
                    }
                </div>
            }
            else if(!props.dataTender?.tender_statuses[props.dataTender?.tender_statuses.length-2]?.penawaran_file){
                return <TextButton size="medium" type="success" onClick={goToDetail}>{"belum ditawarkan"}</TextButton>
            }
            return <div className="flex gap-2">
                <TextButton size="medium" type="success" onClick={goToDetail}>{"telah ditawarkan"}</TextButton>
                {
                    !(props.dataTender?.account_officer?.id) && <Button type={role=="manager-cabang"?"alert":"disable"} size="medium" onClick={onShowClickedAO} disabled={role=="manager-cabang"?false:true}>{role=="manager-cabang"?"tawarkan":"tender baru"}</Button>
                }
            </div>
        case 2:
            return <TextButton size="medium" type="alert" onClick={goToDetail}>{"telah follow up"}</TextButton>
        case 4:
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{"debitur tidak tertarik"}</TextButton>
        case 3:
            return <TextButton size="medium" type="alert" onClick={goToDetail}>{"debitur tertarik"}</TextButton>
        case 5:
            return <TextButton size="medium" type="primary" onClick={goToDetail}>{"kredit disetujui"}</TextButton>
        case 6:
            return <TextButton size="medium" type="danger" onClick={goToDetail}>{"kredit tidak disetujui"}</TextButton>
        default:
            return <Button type="alert" size="medium" onClick={()=>{}}>{"tender baru"}</Button>
    }
}