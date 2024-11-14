import Button from "../../items/buttons/button"

interface StatusAOActionInterface{
    status: string,
}

export default function StatusAOAction(props: StatusAOActionInterface){
    function onOfferClicked(){
        alert("tawar tender")
    }
    switch(props.status){
        case "aktif":
            return <Button type="alert" size="medium" onClick={onOfferClicked}>Pilih</Button>
        case "non-aktif":
            return <Button type="disable" size="medium" onClick={onOfferClicked} disabled={true}>Tidak Aktif</Button>
        default:
            return <p className="text-red-600">Tidak Aktif</p>
    }
}