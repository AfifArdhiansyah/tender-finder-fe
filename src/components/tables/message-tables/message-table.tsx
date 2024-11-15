'use client'

import Table from "../table"
import MessageAction from "./message-action"
import MessageDetailModal from "@/components/items/modals/message-modals/message-detail-modal"
import { useState } from "react"

interface MessageTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
    setMessageDatas: Function
}

export default function MessageTable(props: MessageTableProps){
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
            <Table headers={props.headers} columns={props.columns} datas={props.datas}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm"}>
                                {
                                    col == "message" && (
                                        <MessageAction className="flex justify-between items-center" dataMessage={data} dataIndex={i} hoverBGColor="blue-300" hoverTextColor="white" onClick={onMessageSelected}>
                                            <div className="w-[95%]">
                                                <p className={"line-clamp-1 " + (data["isRead"] ? "text-gray-400":"text-black")}>{data["message"]}</p>
                                            </div>
                                            <div className={`h-2 w-2 rounded-full ${data["isRead"] ? null : "bg-blue-600"}`}></div>
                                        </MessageAction>
                                    )
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </Table>
            {
                isOpenModalMessage ? <MessageDetailModal open={isOpenModalMessage} onCancel={closeModalMessage} dataMessage={selectedMessage}/> : null
            }
        </>
    )
}