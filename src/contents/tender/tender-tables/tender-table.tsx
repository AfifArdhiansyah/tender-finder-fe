'use client'

import Table from "@/components/tables/table"
import StatusAction from "./status-action"
import ChooseAOModal from "@/contents/manager-ao/ao-modals/choose-ao-modal"
import TenderInfoModal from "../tender-modals/tender-info-modal"
import SearchBar from "@/components/items/search-bars/search-bar"
import { useState } from "react"
import { TenderProjectModel } from "@/models/tender-project-model"
import Dropdown from "@/components/items/dropdowns/dropdown"
import Response from "@/components/items/responses/response"
import { MdOutlineRefresh } from "react-icons/md";
import { Tooltip } from "@mui/material"
import Button from "@/components/items/buttons/button"
import { useCookies } from "next-client-cookies"

interface TenderTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
    refreshTable: ()=>void,
    filterOption: string[],
    selectedFilter: string | null,
    findFilteredTable: (filter:string | null)=>void,
    offices?: string[]
    selectedBranch?: string | null,
    findFilteredBranch?: (branch:string | null)=>void
}

export default function TenderTable(props: TenderTableProps){
    const cookies = useCookies();
    const role = cookies.get("role")

    //search purpose
    const [filteredData, setFilteredData] = useState(props.datas);
    function handleSearch(query: string){
        if (query.trim() === "") {
            setFilteredData(props.datas); // Reset to original data if query is empty
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filtered = props.datas.filter((data) =>
                Object.values(data).some((value) =>
                    String(value).toLowerCase().includes(lowercasedQuery)
                )
            );
            setFilteredData(filtered);
        }
    };

    //modal purppose
    const [selectedTender, setSelectedTender] = useState<any>({})
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

    // pagination purpose
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) as any[];
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    const handleItemsPerPageChange = (val: any) => {
        setItemsPerPage(Number(val));
        setCurrentPage(1);
    };

    const refreshTable = () =>{
        props.refreshTable()
        setCurrentPage(1)
        closeModalAO()
    }
    return(
        <>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <SearchBar onSearch={handleSearch} className="w-[400px] max-md:w-[300px] h-full -mr-[30px]"/>
                    <Dropdown parentClassName={"h-fit w-[200px]"} className={"text-gray-200 text-sm hover:bg-blue-500 hover:text-white hover:border-blue-500"} label={props.selectedFilter || "pilih status"} options={props.filterOption} onSelect={props.findFilteredTable}/>
                    {
                        role != "manager-cabang" && (
                            <Dropdown parentClassName={"h-fit w-[200px]"} className={"text-gray-200 text-sm hover:bg-blue-500 hover:text-white hover:border-blue-500"} label={props.selectedBranch || "pilih cabang"} options={props.offices || []} onSelect={props.findFilteredBranch || Function}/>
                        )
                    }
                    <Tooltip title="refresh" placement="right" arrow>
                        <button className="border rounded-full p-2 aspect-square flex justify-center items-center group hover:bg-blue-500 hover:border-blue-500" onClick={props.refreshTable}>
                            <MdOutlineRefresh size={20} className="text-gray-500 group-hover:text-white"/>
                        </button>
                    </Tooltip>
                </div>
                <Button onClick={()=>{}}type={"primary"} className={"h-full px-4"} size={"medium"}>new tender</Button>
            </div>
            {
                props.datas.length == 0 ? (
                    <Response type="empty" message="tidak ada data tender" subMessage="gunakan filter status lainnya"/>
                ) : (
                    <Table className="h-full" headers={props.headers} datas={props.datas} usePagination itemsPerPage={itemsPerPage} currentPage={currentPage} totalPages={totalPages} handleItemsPerPageChange={handleItemsPerPageChange} handlePrevious={handlePrevious} handleNext={handleNext}>
                        {paginatedData.map((data,i)=>(
                            <tr key={"row-"+i}>
                                {props.columns.map((col,j)=>(
                                    <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm border-b-[1px] " + (col == "nilai_tender"?"text-end":"")}>
                                        {col == "status" && (
                                            <div className="flex justify-center">
                                                <StatusAction 
                                                    status={data.tender_statuses[data.tender_statuses.length-1].status.nama} 
                                                    tenderId={data.id} 
                                                    tenderName={data.nama} 
                                                    dataTender={data} 
                                                    isOpenModalAO={isOpenModalAO} 
                                                    isOpenModalTenderDetail={isOpenModalTenderDetail} 
                                                    showModalAO={showModalAO} 
                                                    closeModalAO={closeModalAO} 
                                                    setSelectedTender={onSetTenderSelect} 
                                                    showModalTenderDetail={showModalTenderDetail} 
                                                    closeModalTenderDetail={closeModalTenderDetail}
                                                />
                                            </div>
                                        )}
                                        {
                                            col == "kc" && (
                                                data["branch"]["nama"]
                                            )
                                        }
                                        {
                                            col == "nilai_tender" && (
                                                parseFloat(data[col]).toLocaleString('id-ID')
                                            )
                                        }
                                        {
                                            !((col == "status") || (col == "nilai_tender") || (col == "kc")) && (
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
            {/* Modal */}
            {
                isOpenModalAO ? <ChooseAOModal open={isOpenModalAO} onCancel={closeModalAO} tenderName={selectedTenderName} refreshTable={refreshTable} dataTender={selectedTender as TenderProjectModel}/> : null
            }
            {
                isOpenModalTenderDetail ? <TenderInfoModal open={isOpenModalTenderDetail} onCancel={closeModalTenderDetail} dataTender={selectedTender}/> : null
            }
        </>
    )
}