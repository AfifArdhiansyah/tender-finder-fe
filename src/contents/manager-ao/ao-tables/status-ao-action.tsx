import Button from "@/components/items/buttons/button"
import { UserModel } from "@/hooks/useUser"

interface StatusAOActionInterface{
    status: string,
    ao?: UserModel,
    onClick: (ao: UserModel | undefined) => void
}

export default function StatusAOAction(props: StatusAOActionInterface){
    function onOfferClicked(){
        props.onClick(props.ao)
    }
    if(props.status) return <Button type="alert" size="medium" onClick={onOfferClicked}>Pilih</Button>
    else return <Button type="disable" size="medium" onClick={onOfferClicked} disabled={true}>Tidak Aktif</Button>
}