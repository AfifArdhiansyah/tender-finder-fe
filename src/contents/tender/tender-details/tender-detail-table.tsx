import { useGetTenderById } from "@/hooks/useTenderProjects"
import Loading from "@/components/items/progress/loading";
import Response from "@/components/items/responses/response";

interface TenderDetailTableProps{
    idTender: string
}

export default function TenderDetailTable(props: TenderDetailTableProps){
    const { tenderProject, loading, error } = useGetTenderById(props.idTender);
    return(
        <>
            {
                loading ? (
                    <Loading/>
                ) : error ? (
                   <Response type="error" message={error}/>
                ) : (
                    <div className="grid grid-cols-12 gap-y-2 text-sm">
                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nomor Tender</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.id}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama Tender</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.nama}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama Pemenang</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.nama_pemenang}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nominal Tender</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> Rp. {parseFloat(tenderProject?.nilai_tender as string).toLocaleString('id-ID')}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Alamat Tender</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.lokasi_pekerjaan}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama AO</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.account_officer.nama}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Dokumen Tanda Terima</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> ini dokumen tanda terima</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Foto Follow Up</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> ini data follow up</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Status Penerimaan</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {tenderProject?.tender_statuses[tenderProject.tender_statuses?.length-1].status.nama}</p>

                        <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Produk Yang Dipilih</p>
                        <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {"KMKK"}</p>
                    </div>
                )
            }
        </>
    )
}