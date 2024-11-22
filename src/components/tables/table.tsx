import { ReactNode } from "react"

interface TableProps{
    headers: string[],
    datas: any[],
    children: ReactNode
    usePagination: boolean
    itemsPerPage?: number
    currentPage?: number
    totalPages?: number
    handleItemsPerPageChange?: Function
    handlePrevious?: Function
    handleNext?: Function
}

export default function Table(props: TableProps){
    function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>){
        props.handleItemsPerPageChange? props.handleItemsPerPageChange(e.target.value): null
    }
    function handlePrevious(){
        props.handlePrevious? props.handlePrevious(): null
    }
    function handleNext(){
        props.handleNext? props.handleNext(): null
    }
    return (
        <div>
            <table className="table-auto min-w-full">
                <thead className="rounded-lg bg-gray-100">
                    <tr>
                        {props.headers.map((head, i)=>(
                            <th key={"head-"+i} className="px-2 py-2 text-sm max-md:min-w-[150px]">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
            {/* Pagination Controls */}
            {
                props.usePagination && (
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium">
                                Show:
                            </label>
                            <select
                                id="itemsPerPage"
                                className="px-2 py-1 border rounded-md text-sm"
                                value={props.itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handlePrevious}
                                disabled={props.currentPage === 1}
                                className="px-3 py-1 text-sm border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium">
                                Page {props.currentPage} of {props.totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={props.currentPage === props.totalPages}
                                className="px-3 py-1 text-sm border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}