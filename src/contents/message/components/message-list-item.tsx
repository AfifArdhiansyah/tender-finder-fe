import TransparentButton from "@/components/items/buttons/transparent-button"
import { ReactNode } from "react"

interface MessageListItemInterface{
    dataMessage: any,
    dataIndex: number,
    hoverBGColor: string,
    hoverTextColor: string,
    onClick: Function,
    className?: string,
    disabled?: boolean,
    children?: ReactNode
}

export default function MessageListItem(props: MessageListItemInterface){
    function onMessageClicked(){
        props.onClick(props.dataIndex, props.dataMessage)
    }
    return (
        <TransparentButton className={props.className} hoverBGColor="blue-600" hoverTextColor="white" onClick={onMessageClicked}>
            <div className="w-[95%] max-md:w-[75%]">
                <p className={"line-clamp-1 " + (props.dataMessage["isRead"] ? "text-gray-400":"text-black")}>{props.dataMessage["message"]}</p>
            </div>
            <div className={`h-2 w-2 rounded-full animate-ping ${props.dataMessage["isRead"] ? null : "bg-blue-600"}`}></div>
        </TransparentButton>
    )
}