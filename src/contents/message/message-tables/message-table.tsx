'use client'

import Table from "@/components/tables/table"
import MessageListItem from "../components/message-list-item"
import MessageDetailModal from "../message-modals/message-detail-modal"
import { useState } from "react"

interface MessageTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
    setMessageDatas?: Function
}

export default function MessageTable(props: MessageTableProps){
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState("")
    const [selectedTenderId, setSelectedTenderId] = useState<null|string>(null)
    const [messageDate, setMessageDate] = useState("")
    const showModalMessage = () => {
        setIsOpenModalMessage(true);
    };
    const closeModalMessage = () => {
        setIsOpenModalMessage(false);
    };
    const onMessageSelected = (index:number, message: string, tenderId: string|null, date: string) =>{
        setSelectedMessage(message)
        setMessageDate(date)
        setSelectedTenderId(tenderId)
        // const newMessageData = props.datas
        // newMessageData[index]["isRead"] = true
        // props.setMessageDatas(newMessageData)
        showModalMessage()
    }
    return(
        <>
            <Table headers={props.headers} datas={props.datas} usePagination={false}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm"}>
                                {
                                    col == "message" && (
                                        <MessageListItem 
                                            className="flex justify-between items-center" 
                                            message={data?.message?.message as string} 
                                            isRead={data?.is_read} dataIndex={i} 
                                            tenderId={data?.message?.tender_id}
                                            date={data?.created_at}
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