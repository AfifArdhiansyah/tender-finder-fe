import Table from "@/components/tables/table"
import StatusAOAction from "./status-ao-action"

interface AOListTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
}

export default function AOListTable(props: AOListTableProps){
    return(
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
                                    <StatusAOAction status={data["is_active"]} ao={data}/>
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
    )
}