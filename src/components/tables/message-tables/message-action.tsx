import TransparentButton from "@/components/items/buttons/transparent-button"
import { ReactNode } from "react"

interface MessageActionInterface{
    dataMessage: any,
    dataIndex: number,
    hoverBGColor: string,
    hoverTextColor: string,
    onClick: Function,
    disabled?: boolean,
    children?: ReactNode
}

export default function MessageAction(props: MessageActionInterface){
    function onMessageClicked(){
        props.onClick(props.dataIndex, props.dataMessage)
    }
    return (
        <TransparentButton hoverBGColor="blue-600" hoverTextColor="white" onClick={onMessageClicked}>
            <div className="w-[95%]">
                <p className={"line-clamp-1 " + (props.dataMessage["isRead"] ? "text-gray-400":"text-black")}>{props.dataMessage["message"]}</p>
            </div>
            <div className={`h-2 w-2 rounded-full ${props.dataMessage["isRead"] ? null : "bg-blue-600"}`}></div>
        </TransparentButton>
    )
}