import { ReactNode } from "react"

interface TableProps{
    headers: string[],
    columns: string[]
    datas: any[],
    children: ReactNode
}

export default function Table(props: TableProps){

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
                    {props.children}
                </tbody>
            </table>
        </>
    )
}