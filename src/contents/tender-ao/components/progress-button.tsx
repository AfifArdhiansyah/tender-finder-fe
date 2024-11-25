import Button from "@/components/items/buttons/button"

interface ProgressButtonProps{
    progressIndex: number
    setIndexPrev: Function
    setIndexNext: Function
    className?: string
}

export default function ProgressButton(props: ProgressButtonProps){
    function handlePrev(){
        props.setIndexPrev()
    }
    function handleNext(){
        props.setIndexNext()
    }
    return(
        <div className={"flex gap-2 "+props.className}>
            {props.progressIndex!=0 && <Button className="w-full" type={"general"} size={"small"} onClick={()=>handlePrev()}>sebelumnya</Button>}
            {props.progressIndex!=3 && <Button className="w-full" type={"primary"} size={"small"} onClick={()=>handleNext()}>lanjut</Button>}
        </div>
    )
}