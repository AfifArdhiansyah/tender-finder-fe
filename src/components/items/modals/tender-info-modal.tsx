import Modal from "./modal"

interface TenderInfoModalProps{
    dataTender: any,
    open: boolean,
    onCancel: Function,
}

export default function TenderInfoModal(props: TenderInfoModalProps){
    function onModalClose(){
        props.onCancel()
    }

    return(
        <Modal open={props.open} onCancel={onModalClose} title={"Proogres Tender"}>
            <table className="table-auto mb-4">
                <tbody className="text-sm">
                    <tr>
                        <td className="py-2 font-bold">Nama Tender</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.nama}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Nama Pemenang</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.nama_pemenang}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Nominal Tender</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.nilai_tender}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Alamat Tender</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.alamat_pemenang}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Nama AO</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.ao?.nama}</td>
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
                        <td className="py-2 text-gray-500">{props.dataTender.status}</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Produk Yang Dipilih</td>
                        <td className="py-2 px-2 font-bold">:</td>
                        <td className="py-2 text-gray-500">{props.dataTender.produk?.nama}</td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    )
}