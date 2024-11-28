import { TenderAOModel } from "@/models/tender-ao-model"
import Pill from "@/components/items/pill"
import Link from "next/link"

interface TenderListItemProps{
    dataTender: TenderAOModel
}

export default function TenderListItem(props: TenderListItemProps){
    function getStatusType(status:string){
        switch(status){
            case 'baru':
                return 'alert'
            case 'dalam-penawaran':
                return 'success'
            case 'mengajukan-kredit':
                return 'primary'
            case 'penawaran-ditolak':
                return 'danger'
            default:
                return 'alert'
        }
    }
    function getStatusLabel(status:string){
        switch(status){
            case 'baru':
                return 'Belum Ditawarkan'
            case 'dalam-penawaran':
                return 'Penawaran Kredit'
            case 'mengajukan-kredit':
                return 'Mengajukan Kredit'
            case 'penawaran-ditolak':
                return 'Penawaran Ditolak'
            default:
                return 'Belum Ditawarkan'
        }
    }
    function getStatusColor(status: string){
        switch(status){
            case 'baru':
                return 'bg-yellow-200'
            case 'dalam-penawaran':
                return 'bg-green-400'
            case 'mengajukan-kredit':
                return 'bg-blue-400'
            case 'penawaran-ditolak':
                return 'bg-red-400'
            default:
                return 'bg-yellow-400'
        }
    }
    return(
        <Link className="flex w-full" href={"/ao-tender/"+props.dataTender.id}>
            <div className={"w-2 h-full rounded-l-xl " + getStatusColor(props.dataTender.status)}></div>
             <div className="flex flex-col text-sm bg-white px-2 py-2 gap-2 rounded-r-xl w-full">
                <p className="font-bold text-md">{props.dataTender.nama}</p>
                <p className="text-blue-500">{props.dataTender.nama_pemenang}</p>
                <p className="text-gray-500">Rp. {parseFloat(props.dataTender.nilai_tender).toLocaleString('id-ID')}</p>
                <hr />
                <p>Alamat Tender:</p>
                <p className="text-gray-500">{props.dataTender.alamat_pemenang}</p>
                <Pill type={getStatusType(props.dataTender.status)} size={"small"}>{getStatusLabel(props.dataTender.status)}</Pill>
            </div>
        </Link>
    )
}