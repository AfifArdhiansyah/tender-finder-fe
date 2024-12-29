import TransparentButton from "@/components/items/buttons/transparent-button"
import { ReactNode } from "react"

interface MessageListItemInterface{
    message: string,
    isRead: boolean,
    date: string,
    tenderId?: string,
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
        props.onClick(props.dataIndex, props.message, props.tenderId, props.date)
    }
    return (
        <TransparentButton className={props.className} hoverBGColor="gray-200" hoverTextColor="white" onClick={onMessageClicked}>
            <div className="w-[95%] max-md:w-[75%]">
                <p className={"line-clamp-1 " + (props.isRead ? "text-gray-400":"text-black")}>{props.message}</p>
            </div>
            <div className={`h-2 w-2 rounded-full animate-ping ${props.isRead ? null : "bg-blue-600"}`}></div>
        </TransparentButton>
    )
}