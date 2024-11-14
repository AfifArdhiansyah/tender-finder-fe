import StatusAction from "./status-action"

interface TableProps{
    headers: string[],
    columns: string[]
    datas: any[]
}

export default function Table(props: TableProps){
    return (
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
                                    <StatusAction status={data[col]} tenderId={data["id"]}/>
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
    )
}