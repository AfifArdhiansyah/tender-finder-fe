'use client'

import StatusAction from "./status-action"
import Modal from "../items/modals/modal"
import { useState } from "react"

interface TableProps{
    headers: string[],
    columns: string[]
    datas: any[]
}

export default function Table(props: TableProps){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const showModal = () => {
        console.log("woyyyy")
        setIsOpenModal(true);
    };
    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <table className="table-fixed">
                <thead className="rounded-lg bg-gray-100">
                    <tr>
                        {props.headers.map((head, i)=>(
                            <th key={"head-"+i} className="px-2 py-2 text-sm">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.datas.map((data,i)=>(
                        <tr key={"row-"+i}>
                            {props.columns.map((col,j)=>(
                                <td key={i.toString() + j.toString()} className="px-2 py-2 text-sm">
                                    {col == "status" && (
                                        <StatusAction status={data[col]} tenderId={data["id"]} isOpenModal={isOpenModal} showModal={showModal} closeModal={closeModal}/>
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
                </tbody>
            </table>
            {/* Modal */}
            {
                isOpenModal ? <Modal open={isOpenModal} onCancel={closeModal}/> : null
            }
        </>
    )
}