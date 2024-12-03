'use client'

import TenderListItem from "./components/tender-list-item"
import { useGetTendersByUser } from "@/hooks/useTenderProjects"
import Loading from "@/components/items/progress/loading";

export default function TenderListAO(){
    const { tenderProjects, loading, error } = useGetTendersByUser();
    return(
        <div className="flex flex-col gap-4">
            {
                loading ? (
                    <Loading/>
                ) : error ? (
                    <p>{error}</p>
                ) : (tenderProjects && tenderProjects.length > 0) ? (
                    tenderProjects.map((tender, i) => (
                        <TenderListItem key={i} dataTender={tender} />
                    ))
                ) : (
                    <p>Tidak ada tender</p>
                )
            }
        </div>
    )
}