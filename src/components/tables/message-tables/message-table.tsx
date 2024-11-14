import Table from "../table"

interface MessageTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
}

export default function MessageTable(props: MessageTableProps){
    return(
        <Table headers={props.headers} columns={props.columns} datas={props.datas}>
            {props.datas.map((data,i)=>(
                <tr key={"row-"+i}>
                    {props.columns.map((col,j)=>(
                        <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm"}>
                            {
                                col == "message" && (
                                    <div className="flex justify-between items-center">
                                        <div className="w-[95%]">
                                            <p className={"line-clamp-1 " + (data["isRead"] ? "text-gray-400":"text-black")}>{data["message"]}</p>
                                        </div>
                                        <div className={`h-2 w-2 rounded-full ${data["isRead"] ? null : "bg-blue-600"}`}></div>
                                    </div>
                                )
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </Table>
    )
}