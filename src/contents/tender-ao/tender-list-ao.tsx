import { TenderAODumpData } from "@/constants/tender-ao/teder-ao-data"
import TenderListItem from "./components/tender-list-item"

export default function TenderListAO(){
    return(
        <div className="flex flex-col gap-4">
            {
                TenderAODumpData.map((tender, i) => (
                    <TenderListItem key={i} dataTender={tender} />
                ))
            }
        </div>
    )
}