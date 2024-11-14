'use client'

import Table from "../table"
import StatusAction from "./status-action"
import ChooseAOModal from "@/components/items/modals/choose-ao-modal"
import TenderInfoModal from "@/components/items/modals/tender-info-modal"
import { useState } from "react"

interface TenderTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
}

export default function TenderTable(props: TenderTableProps){
    const [selectedTender, setSelectedTender] = useState({})
    const [selectedTenderName, setSelectedTenderName] = useState("")
    const [isOpenModalAO, setIsOpenModalAO] = useState(false)
    const showModalAO = () => {
        setIsOpenModalAO(true);
    };
    const closeModalAO = () => {
        setIsOpenModalAO(false);
    };
    const onSetTenderSelect = (name:string, id: string, data:any) =>{
        setSelectedTender(data)
        setSelectedTenderName(name + " - " + id)
    }
    const [isOpenModalTenderDetail, setIsOpenModalTenderDetail] = useState(false)
    const showModalTenderDetail = () => {
        setIsOpenModalTenderDetail(true);
    };
    const closeModalTenderDetail = () => {
        setIsOpenModalTenderDetail(false);
    };
    return(
        <>
            <Table headers={props.headers} columns={props.columns} datas={props.datas}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className="px-2 py-2 text-sm">
                                {col == "status" && (
                                    <div className="flex justify-center">
                                        <StatusAction status={data[col]} tenderId={data["id"]} tenderName={data["nama"]} dataTender={data} isOpenModalAO={isOpenModalAO} isOpenModalTenderDetail={isOpenModalTenderDetail} showModalAO={showModalAO} closeModalAO={closeModalAO} setSelectedTender={onSetTenderSelect} showModalTenderDetail={showModalTenderDetail} closeModalTenderDetail={closeModalTenderDetail}/>
                                    </div>
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
                isOpenModalAO ? <ChooseAOModal open={isOpenModalAO} onCancel={closeModalAO} tenderName={selectedTenderName}/> : null
            }
            {
                isOpenModalTenderDetail ? <TenderInfoModal open={isOpenModalTenderDetail} onCancel={closeModalTenderDetail} dataTender={selectedTender}/> : null
            }
        </>
    )
}