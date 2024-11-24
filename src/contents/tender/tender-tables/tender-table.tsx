'use client'

import Table from "@/components/tables/table"
import StatusAction from "./status-action"
import ChooseAOModal from "@/contents/manager-ao/ao-modals/choose-ao-modal"
import TenderInfoModal from "../tender-modals/tender-info-modal"
import SearchBar from "@/components/items/search-bars/search-bar"
import { useState } from "react"

interface TenderTableProps{
    headers: string[],
    columns: string[]
    datas: any[],
}

export default function TenderTable(props: TenderTableProps){
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

    // pagination purpose
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
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
    return(
        <>
            <SearchBar onSearch={handleSearch} className="w-[400px] max-md:w-[300px]"/>
            <Table className="h-full" headers={props.headers} datas={props.datas} usePagination itemsPerPage={itemsPerPage} currentPage={currentPage} totalPages={totalPages} handleItemsPerPageChange={handleItemsPerPageChange} handlePrevious={handlePrevious} handleNext={handleNext}>
                {paginatedData.map((data,i)=>(
                    <tr key={"row-"+i}>
                        {props.columns.map((col,j)=>(
                            <td key={i.toString() + j.toString()} className={"px-2 py-2 text-sm border-b-[1px] " + (col == "nilai_tender"?"text-end":"")}>
                                {col == "status" && (
                                    <div className="flex justify-center">
                                        <StatusAction status={data[col]} tenderId={data["id"]} tenderName={data["nama"]} dataTender={data} isOpenModalAO={isOpenModalAO} isOpenModalTenderDetail={isOpenModalTenderDetail} showModalAO={showModalAO} closeModalAO={closeModalAO} setSelectedTender={onSetTenderSelect} showModalTenderDetail={showModalTenderDetail} closeModalTenderDetail={closeModalTenderDetail}/>
                                    </div>
                                )}
                                {
                                    col == "nilai_tender" && (
                                        parseFloat(data[col]).toLocaleString('id-ID')
                                    )
                                }
                                {
                                    !((col == "status") || (col == "nilai_tender")) && (
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