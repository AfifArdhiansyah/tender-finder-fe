import { useGetTenderById } from "@/hooks/useTenderProjects"

interface TenderDetailContentProps{
    idTender: string
}

export default function TenderDetailContent(props: TenderDetailContentProps){
    const { tenderProject, loading, error } = useGetTenderById(props.idTender);
    return(
        <>
            {
                loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <table className="table-auto mb-4">
                        <tbody className="text-sm">
                            <tr>
                                <td className="py-2 font-bold">Nomor Tender</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.id}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Nama Tender</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.nama}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Nama Pemenang</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.nama_pemenang}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Nominal Tender</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">Rp. {parseFloat(tenderProject?.nilai_tender as string).toLocaleString('id-ID')}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Alamat Tender</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.lokasi_pekerjaan}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Nama AO</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.ao_id}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Dokumen Tanda Terima</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">ini dokumen tanda terima</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Foto Follow Up</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">ini data follow up</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Status Penerimaan</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{tenderProject?.status}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Produk Yang Dipilih</td>
                                <td className="py-2 px-2 font-bold">:</td>
                                <td className="py-2 text-gray-500">{"KMKK"}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        </>
    )
}