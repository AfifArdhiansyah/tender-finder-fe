'use client'

import Table from "@/components/tables/table"
import MessageListItem from "../components/message-list-item"
import MessageDetailModal from "../message-modals/message-detail-modal"
import { useState } from "react"
import { useReadMessage } from "@/hooks/useMessage"
import { UserMessageModel } from "@/models/message-model"

interface MessageTableProps{
    headers: string[],
    columns: string[]
    datas: UserMessageModel[],
    setMessageRead: (index: number)=>void
}

export default function MessageTable(props: MessageTableProps){
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState("")
    const [selectedTenderId, setSelectedTenderId] = useState<null|string>(null)
    const [messageDate, setMessageDate] = useState("")
    const {setReadMessage } = useReadMessage()
    const showModalMessage = () => {
        setIsOpenModalMessage(true);
    };
    const closeModalMessage = () => {
        setIsOpenModalMessage(false);
    };
    const onMessageSelected =  (index: number, message: string, tenderId?: string, date?: string, userMessageId?: number) =>{
        setSelectedMessage(message)
        setMessageDate(date ?? "")
        setSelectedTenderId(tenderId ?? null)
        props.setMessageRead(index)
        showModalMessage()
        if (userMessageId !== undefined) {
            setReadMessage(userMessageId)
        }
    }
    return(
        <>
            <Table headers={props.headers} datas={props.datas} usePagination={false}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            col != "is_read" && <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm"}>
                            {
                                col == "message" && (
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
                                )
                            }
                        </td>
                        ))}
                    </tr>
                ))}
            </Table>
            {
                isOpenModalMessage ? <MessageDetailModal open={isOpenModalMessage} onCancel={closeModalMessage} message={selectedMessage} datetime={messageDate} tenderId={selectedTenderId || null}/> : null
            }
        </>
    )
}