'use client'

import { useState } from "react"

import Table from "@/components/tables/table"
import StatusAOAction from "./status-ao-action"
import AssignAOConfirmation from "@/contents/tender/tender-modals/assign-ao-conformation"
import { TenderProjectModel } from "@/models/tender-project-model"
import { UserModel } from "@/hooks/useUser"

interface AOListTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
    dataTender: TenderProjectModel,
    refreshTable: ()=>void
}

export default function AOListTable(props: AOListTableProps){
    const [isOpenModalConfirmation, setIsOpenModalConfirmasion] = useState(false)
    const showModalConfirmation = () => {
        setIsOpenModalConfirmasion(true);
    };
    const closeModalConfirmation = () => {
        setIsOpenModalConfirmasion(false);
    };
    function onSelectAO(data: UserModel){
        setSelectedAO(data)
        showModalConfirmation()
    }
    const [selectedAO, setSelectedAO] = useState<UserModel>()
    function refreshTable(){
        props.refreshTable()
        closeModalConfirmation()
    }
    return(
        <>
            <Table headers={props.headers} datas={props.datas} usePagination={false}>
                {props.datas.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm"}>
                                {col == "is_active" && (
                                    data[col]? (
                                        <p className="text-green-600 text-center">Aktif</p>
                                    ) : (
                                        <p className="text-red-600 text-center">Tidak Aktif</p>
                                    )
                                )}
                                {col == "action" && (
                                    <div className="flex justify-center">
                                        <StatusAOAction status={data["is_active"]} ao={data} onClick={onSelectAO}/>
                                    </div>
                                )}
                                {
                                    !(col == "is_active" || col == "action") && (
                                        data[col]
                                    )
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </Table>
            {
                isOpenModalConfirmation ? 
                    <AssignAOConfirmation 
                        open={isOpenModalConfirmation} 
                        onCancel={closeModalConfirmation} 
                        tenderName={props.dataTender.nama} 
                        tenderId={props.dataTender.id} 
                        aoName={selectedAO?.nama as string} 
                        aoID={selectedAO?.id as number} 
                        refreshTable={refreshTable}
                    /> : null
            }
        </>
    )
}