import Modal from "@/components/items/modals/modal"
import InputText from "@/components/inputs/input-text"
import InputTextArea from "@/components/inputs/input-text-area"

interface NewTenderConfirmationProps{
    isOpenModal: boolean,
    namaTender: string,
    alamatTender: string,
    nilaiTender: string,
    namaPemenang: string,
    npwpPemenang: string,
    alamatPemenang: string,
    selectedBranch: string | null,
    selectedAO: string | null
    handleCancel: ()=>void
    submitAction: ()=>void
}

export default function NewTenderConfirmation(
    {isOpenModal, namaTender, alamatTender, nilaiTender, namaPemenang, npwpPemenang, alamatPemenang, selectedBranch, selectedAO, handleCancel, submitAction}: NewTenderConfirmationProps
) {
    return (
        <Modal open={isOpenModal} onCancel={handleCancel} title={"Konfirmasi Data Tender Baru"} subTitle={"pastikan data yang dimasukkan sudah benar"} useFooterAction confirmAction={submitAction}>
            <div className="w-full overflow-y-auto max-h-[70vh] grid grid-cols-12 gap-2">
                <label className="text-sm col-span-5">Nama Tender</label>
                <p className="col-span-7">: {namaTender}</p>
                <label className="text-sm col-span-5">Alamat Projek Tender</label>
                <p className="col-span-7">: {alamatTender}</p>
                <label className="text-sm col-span-5">Nilai Tender</label>
                <p className="col-span-7">: {nilaiTender}</p>
                <label className="text-sm col-span-5">Nama Instansi Pemenang Tender</label>
                <p className="col-span-7">: {namaPemenang}</p>
                <label className="text-sm col-span-5">NPWP Instansi Pemenang Tender</label>
                <p className="col-span-7">: {npwpPemenang}</p>
                <label className="text-sm col-span-5">Alamat Pemenang Tender</label>
                <p className="col-span-7">: {alamatPemenang}</p>
                <label className="text-sm col-span-5">Kantor Cabang</label>
                <p className="col-span-7">: {selectedBranch}</p>
                <label className="text-sm col-span-5">Account Officer</label>
                <p className="col-span-7">: {selectedAO}</p>
            </div>
        </Modal>
    )
}