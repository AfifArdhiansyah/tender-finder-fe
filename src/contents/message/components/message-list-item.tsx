import TransparentButton from "@/components/items/buttons/transparent-button"
import { ReactNode } from "react"
import { IoIosMail, IoIosMailOpen } from "react-icons/io";
import { rawDateToLocaleString, getDurationFromRawDateToNow } from "@/services/formatDate";
import { FaRegClock } from "react-icons/fa";

interface MessageListItemInterface{
    message: string,
    isRead: boolean,
    date: string,
    userMessageId: number
    tenderId?: string,
    dataIndex: number,
    hoverBGColor: string,
    hoverTextColor: string,
    onClick: (index: number, message: string, tenderId?: string, date?: string, userMessageId?: number) => void,
    className?: string,
    disabled?: boolean,
    children?: ReactNode
}

export default function MessageListItem(props: MessageListItemInterface){
    function onMessageClicked(){
        props.onClick(props.dataIndex, props.message, props.tenderId, props.date, props.userMessageId)
    }
    return (
        // <TransparentButton className={props.className} hoverBGColor="gray-200" hoverTextColor="white" onClick={onMessageClicked}>
        //     <div className="w-[95%] px-2">
        //         <p className={"line-clamp-1 max-md:text-sm " + (props.isRead ? "text-gray-400":"text-black")}>{props.message}</p>
        //     </div>
        //     <div className={`h-2 w-2 rounded-full animate-ping ${props.isRead ? null : "bg-blue-600"}`}></div>
        // </TransparentButton>
        <TransparentButton className={props.className as string +( props.isRead?" hover:bg-gray-100 border ":" hover:bg-blue-200 bg-blue-100 border border-blue-300 ") + " rounded py-2"} hoverBGColor={props.isRead?" gray-100":" blue-200"} hoverTextColor="white" onClick={onMessageClicked}>
            <div className="w-[30px]">
                {
                    props.isRead ? 
                        <IoIosMailOpen size={20} className="text-gray-300"/> 
                        : 
                        <div className="relative">
                            <div className={`absolute top-0 right-2 h-1.5 w-1.5 rounded-full animate-ping ${props.isRead ? 'hidden' : 'bg-blue-600'}`}></div>
                            <IoIosMail size={20} className="text-blue-600"/>
                        </div>
                }
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className={"line-clamp-1 max-md:text-sm " + (props.isRead ? "text-gray-400":"text-black")}>{props.message}</p>
                <div className="flex max-md:flex-col justify-between gap-1">
                    <p className="text-xs text-gray-400">{rawDateToLocaleString(props.date)}</p>
                    <div className="flex gap-1 items-center">
                        <FaRegClock className="text-gray-400 w-[12px]"/>
                        <p className="text-xs text-gray-400">{getDurationFromRawDateToNow(props.date)}</p>
                    </div>
                </div>
            </div>
            {/* <div className={`h-2 w-2 rounded-full animate-ping ${props.isRead ? null : "bg-blue-600"}`}></div> */}
        </TransparentButton>
    )
}