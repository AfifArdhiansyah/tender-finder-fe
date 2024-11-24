'use client'

import MessageDetailModal from "../message-modals/message-detail-modal"
import MessageListItem from "../components/message-list-item"
import { useState } from "react"

interface MessageListAOProps{
    datas: any[],
    setMessageDatas: Function
}

export default function MessageListAO(props: MessageListAOProps){
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState({})
    const showModalMessage = () => {
        setIsOpenModalMessage(true);
    };
    const closeModalMessage = () => {
        setIsOpenModalMessage(false);
    };
    const onMessageSelected = (index:number, messageData: any) =>{
        setSelectedMessage(messageData)
        const newMessageData = props.datas
        newMessageData[index]["isRead"] = true
        props.setMessageDatas(newMessageData)
        showModalMessage()
    }
    return(
        <>
            <div className="flex flex-col gap-2">
                {
                    props.datas.map((message, i)=>(
                        <MessageListItem key={i} className="max-md:text-sm flex justify-between items-center bg-white border rounded-xl px-2 py-3" dataMessage={message} dataIndex={i} onClick={onMessageSelected} hoverBGColor="blue-600" hoverTextColor="white"/>
                    ))
                }
            </div>
            {
                isOpenModalMessage ? <MessageDetailModal open={isOpenModalMessage} onCancel={closeModalMessage} dataMessage={selectedMessage}/> : null
            }
        </>
    )
}