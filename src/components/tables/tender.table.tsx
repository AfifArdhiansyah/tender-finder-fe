'use client'

import Table from "./table"
import StatusAction from "./status-action"
import ChooseAOModal from "../items/modals/choose-ao-modal"
import { useState } from "react"

interface TenderTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
}

export default function TenderTable(props: TenderTableProps){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedTender, setSelectedTender] = useState("")
    const showModal = () => {
        setIsOpenModal(true);
    };
    const closeModal = () => {
        setIsOpenModal(false);
    };
    const onSetTenderSelect = (name:string, id: string) =>{
        setSelectedTender(name + " - " + id)
    }
    return(
        <>
            <Table headers={props.headers} columns={props.columns} datas={props.datas}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className="px-2 py-2 text-sm">
                                {col == "status" && (
                                    <StatusAction status={data[col]} tenderId={data["id"]} tenderName={data["nama"]} isOpenModal={isOpenModal} showModal={showModal} closeModal={closeModal} setSelectedTender={onSetTenderSelect}/>
                                )}
                                {
                                    col != "status" && (
                                        data[col]
                                    )
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </Table>
            {/* Modal */}
            {
                isOpenModal ? <ChooseAOModal open={isOpenModal} onCancel={closeModal} tenderName={selectedTender}/> : null
            }
        </>
    )
}