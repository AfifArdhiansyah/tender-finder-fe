import Pill from "@/components/items/pill"
import Link from "next/link"
import { TenderProjectModel } from "@/models/tender-project-model"

interface TenderListItemProps{
    dataTender: TenderProjectModel
}

export default function TenderListItem(props: TenderListItemProps){
    function getStatusType(status:string){
        switch(status){
            case 'pemenang baru':
                return 'alert'
            case 'penawaran':
                return 'alert'
            case 'tidak berminat':
                return 'danger'
            case 'pengajuan':
                return 'primary'
            case 'kredit ditolak':
                return 'danger'
            case 'kredit disetujui':
                return 'primary'
            default:
                return 'alert'
        }
    }
    function getStatusLabel(status:string){
        switch(status){
            case 'pemenang baru':
                return 'Belum Ditawarkan'
            case 'penawaran':
                return 'Penawaran Kredit'
            case 'tidak berminat':
                return 'Penawaran Ditolak'
            case 'pengajuan':
                return 'Mengajukan Kredit'
            case 'kredit ditolak':
                return 'Pengajuan Ditolak'
            case 'kredit disetujui':
                return 'Pengajuan Disetujui'
            default:
                return 'Belum Ditawarkan'
        }
    }
    function getStatusColor(status: string){
        switch(status){
            case 'pemenang baru':
                return 'bg-yellow-200'
            case 'penawaran':
                return 'bg-yellow-200'
            case 'tidak berminat':
                return 'bg-red-400'
            case 'pengajuan':
                return 'bg-blue-400'
            case 'kredit ditolak':
                return 'bg-red-400'
            case 'kredit disetujui':
                return 'bg-blue-400'
            default:
                return 'bg-yellow-400'
        }
    }
    return(
        <Link className="flex w-full" href={"/ao-tender/"+props.dataTender.id}>
            <div className={"w-2 h-full rounded-l-xl " + getStatusColor(props.dataTender.tender_statuses[props.dataTender.tender_statuses.length-1].status.nama)}></div>
             <div className="flex flex-col text-sm bg-white px-2 py-2 gap-2 rounded-r-xl w-full">
                <p className="font-bold text-md">{props.dataTender.nama}</p>
                <p className="text-blue-500">{props.dataTender.nama_pemenang}</p>
                <p className="text-gray-500">Rp. {parseFloat(props.dataTender.nilai_tender).toLocaleString('id-ID')}</p>
                <hr />
                <p>Alamat Tender:</p>
                <p className="text-gray-500">{props.dataTender.lokasi_pekerjaan}</p>
                <Pill type={getStatusType(props.dataTender.tender_statuses[props.dataTender.tender_statuses.length-1].status.nama)} size={"small"}>{getStatusLabel(props.dataTender.tender_statuses[props.dataTender.tender_statuses.length-1].status.nama)}</Pill>
            </div>
        </Link>
    )
}