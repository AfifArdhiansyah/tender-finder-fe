'use client'

import MessageDetailModal from "../message-modals/message-detail-modal"
import MessageListItem from "../components/message-list-item"
import { useState } from "react"
import { useReadMessage } from "@/hooks/useMessage"
import { UserMessageModel } from "@/models/message-model"

interface MessageListAOProps{
    datas: UserMessageModel[],
    setMessageRead: (index: number)=>void
}

export default function MessageListAO(props: MessageListAOProps){
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState("")
        const [selectedTenderId, setSelectedTenderId] = useState<null|string>(null)
        const [messageDate, setMessageDate] = useState("")
        const { setReadMessage } = useReadMessage()
        const showModalMessage = () => {
            setIsOpenModalMessage(true);
        };
        const closeModalMessage = () => {
            setIsOpenModalMessage(false);
        };
        const onMessageSelected = (index: number, message: string, tenderId?: string, date: string = "", userMessageId?: number) =>{
            setSelectedMessage(message)
            setMessageDate(date)
            setSelectedTenderId(tenderId ?? null)
            props.setMessageRead(index)
            showModalMessage()
            if (userMessageId !== undefined) {
                setReadMessage(userMessageId)
            }
        }
    return(
        <>
            <div className="flex flex-col gap-2">
                <p className="bg-gray-200 text-center font-bold text-sm mb-2">message</p>
                {
                    props.datas.map((data, i)=>(
                        <MessageListItem 
                            key={i}
                            className="flex justify-between items-center" 
                            message={data?.message?.message as string} 
                            isRead={data?.is_read} dataIndex={i} 
                            tenderId={data?.message?.tender_id}
                            date={data?.created_at}
                            userMessageId={data?.id}
                            hoverBGColor="blue-300" 
                            hoverTextColor="white" 
                            onClick={onMessageSelected}
                        />
                    ))
                }
            </div>
            {
                isOpenModalMessage ? <MessageDetailModal open={isOpenModalMessage} onCancel={closeModalMessage} message={selectedMessage} datetime={messageDate} tenderId={selectedTenderId || null}/> : null
            }
        </>
    )
}