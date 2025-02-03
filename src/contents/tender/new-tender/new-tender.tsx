'use client'

import InputText from "@/components/inputs/input-text"
import InputTextArea from "@/components/inputs/input-text-area"
import Button from "@/components/items/buttons/button"
import Dropdown from "@/components/items/dropdowns/dropdown"
import { useAOs } from "@/hooks/useAO"
import { useGetOffice } from "@/hooks/useOffice"
import { useEffect, useState } from "react"
import NewTenderConfirmation from "./new-tender-confirm-modal"
import toast from "react-hot-toast"
import { NewTenderProjectModel } from "@/models/new-tender-project-model"
import { useNewTenderProject } from "@/hooks/useTenderProjects"
import { useCookies } from "next-client-cookies"
import { stringToIdrFormat, idrToStringFormat } from "@/services/formatIDR"
import { useUserContext } from "@/contexts/useUserContext"

export default function AddNewTenderContent() {
    const {offices, getOfficeByWilayah} = useGetOffice()
    const {user} = useUserContext()
    const officeId = user?.office_id || "1"
    const {aos} = useAOs()
    const {createTenderProject, loading, error} = useNewTenderProject()
    useEffect(()=>{
        getOfficeByWilayah("1")
    }, [])
    const cookies = useCookies();
    //form
    //tender
    const [namaTender, setNamaTender] = useState<string>("")
    function handleChangeNamaTender(e: React.ChangeEvent<HTMLInputElement>){
        setNamaTender(e.target.value)
    }
    const [alamatTender, setAlamatTender] = useState<string>("")
    function handleChangeAlamatTender(val: string){
        setAlamatTender(val)
    }
    const [nilaiTender, setNilaiTender] = useState<string>("")
    function handleChangeNilaiTender(e: React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
        const formatted = stringToIdrFormat(value)
        setNilaiTender(formatted)
    }
    //pemenang tender
    const [namaPemenang, setNamaPemenang] = useState<string>("")
    function handleChangeNamaPemenang(e: React.ChangeEvent<HTMLInputElement>){
        setNamaPemenang(e.target.value)
    }
    const [npwpPemenang, setNpwpPemenang] = useState<string>("")
    function handleChangeNpwpPemenang(e: React.ChangeEvent<HTMLInputElement>){
        const formatted = formatNPWP(e.target.value)
        setNpwpPemenang(formatted)
    }
    const [alamatPemenang, setAlamatPemenang] = useState<string>("")
    function handleChangeAlamatPemenang(val: string){
        setAlamatPemenang(val)
    }
    //kantor cabang
    const [selectedBranch] = useState<string>(officeId as string)
    // function handleSelectBranch(branch: string | null){
    //     setSelectedBranch(branch)
    // }
    //account officer
    function getOfficeByBranch(branch: string){
        return offices?.find(office => office.id === branch as unknown as number)?.nama || null
    }
    const [selectedAO, setSelectedAO] = useState<string | null>(null)
    function handleSelectAO(ao: string | null){
        setSelectedAO(ao)
    }
    function isAllInputFilled(){
        return (
            namaTender !== "" &&
            alamatTender !== "" &&
            nilaiTender !== "" &&
            namaPemenang !== "" &&
            npwpPemenang !== "" &&
            alamatPemenang !== "" &&
            selectedBranch !== null
        )
    }
    //modal purpose
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    function showModal(){
        if(!isAllInputFilled()){
            toast.error("semua field data harus diisi")
            return
        }
        setIsOpenModal(true)
    }
    function closeModal(){
        setIsOpenModal(false)
    }
    //submit purpose
    function goToTenderPage(){
        window.location.href = "/tender"
    }
    async function handleSubmit(){
        const submitData = {
            nama: namaTender,
            lokasi_pekerjaan: alamatTender,
            nama_pemenang: namaPemenang,
            npwp: cleanNPWP(npwpPemenang),
            lokasi_instansi: alamatPemenang,
            ltd_loc: '0.00000000',
            lng_loc: '0.00000000',
            nilai_tender: idrToStringFormat(nilaiTender),
            branch_id: offices?.find(office => office.nama === selectedBranch)?.id || null,
            ao_id: aos?.find(ao => ao.nama === selectedAO)?.id ? aos.find(ao => ao.nama === selectedAO)?.id.toString() : null,
        } as NewTenderProjectModel
        await createTenderProject(submitData)
        if(!loading && !error){
            closeModal()
            if(selectedAO){
                cookies.set("selected-status", "0")
            }
            else{
                cookies.set("selected-status", "-1")
            }
            goToTenderPage()
        }
    }
    //format input NPWP
    function formatNPWP(val: string){
        const cleaned = ("" + val).replace(/\D/g, "");
        const match = cleaned.match(/(\d{0,2})?(\d{0,3})?(\d{0,3})?(\d{0,1})?(\d{0,3})?(\d{0,3})$/);
        if (!match) return val;
        return [
                match[1],
                match[2] ? "." : "",
                match[2],
                match[3] ? "." : "",
                match[3],
                match[4] ? "." : "",
                match[4],
                match[5] ? "-" : "",
                match[5],
                match[6] ? "." : "",
                match[6]
        ].join("")
    }
    //clean value NPWP
    function cleanNPWP(val: string){
        return val.replace(/[^0-9]/, "")
    }
    return (
        <div className="flex flex-col gap-8 pb-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold">Informasi Tender</h1>
                    <p className="text-xs text-gray-500">masukkan informasi yang dibutuhkan terkait penambahan projek tender baru</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Nama Tender</label>
                    <InputText placeholder="Masukkan nama tender..." className="text-sm rounded-md" value={namaTender} onChange={handleChangeNamaTender}/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Alamat Projek Tender</label>
                    <InputTextArea placeholder="Masukkan alamat pekerjaan tender..." className="text-sm rounded-md" value={alamatTender} onChange={handleChangeAlamatTender} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Nilai Tender</label>
                    <InputText prefix="Rp." placeholder="Masukkan nilai harga projek tender..." type="text" className="text-sm rounded-md" value={stringToIdrFormat(nilaiTender)} onChange={handleChangeNilaiTender}/>
                </div>
            </div>
            {/* <div className="h-[0px] w-[95%] flex self-center outline-dashed outline-1 outline-gray-300"/> */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold">Informasi Pemenang Tender</h1>
                    <p className="text-xs text-gray-500">masukkan informasi yang dibutuhkan terkait pemenang tender dari projek di atas</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Nama Instansi Pemenang Tender</label>
                    <InputText placeholder="Masukkan nama instansi pemenang tender..." className="text-sm rounded-md" value={namaPemenang} onChange={handleChangeNamaPemenang}/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">NPWP Instansi Pemenang Tender</label>
                    <InputText placeholder="xx.xxx.xxx.x-xxx.xxx" className="text-sm rounded-md" value={npwpPemenang} maxLength={16} onChange={handleChangeNpwpPemenang}/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Alamat Pemenang Tender</label>
                    <InputTextArea placeholder="Masukkan alamat pemenang tender..." className="text-sm rounded-md" value={alamatPemenang} onChange={handleChangeAlamatPemenang} />
                </div>
            </div>
            {/* <div className="h-[0px] w-[95%] flex self-center outline-dashed outline-1 outline-gray-300"/> */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold">Informasi Kantor Cabang</h1>
                    <p className="text-xs text-gray-500">pilih kantor cabang yang melaksanakan proses kredit dari projek di atas</p>
                </div>
                {/* <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Pilih Kantor Cabang</label>
                    <Dropdown label={"pilih kantor cabang"} options={offices?.map(office => office.nama) || []} onSelect={handleSelectBranch} />
                </div> */}
                {
                    selectedBranch && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm">Kantor Cabang</label>
                            <InputText value={getOfficeByBranch(selectedBranch) || ""} className="text-sm rounded-md" disabled/>
                        </div>
                    )
                }
            </div>
            {/* <div className="h-[0px] w-[95%] flex self-center outline-dashed outline-1 outline-gray-300"/> */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold">Informasi Account Officer</h1>
                    <p className="text-xs text-gray-500">pilih Account Officer yang melaksanakan proses penawaran kredit ke pemenang tender di atas</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm">Pilih Account Officer</label>
                    <Dropdown label={"pilih account officer"} options={aos?.map(ao => ao.nama) || []} onSelect={handleSelectAO} />
                </div>
                {
                    selectedAO && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm">Account Officer</label>
                            <InputText value={selectedAO} className="text-sm rounded-md" disabled/>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-end my-8">
                <Button type="primary" size="medium" className="px-8" onClick={showModal}>submit</Button>
            </div>
            {
                isOpenModal && (
                    <NewTenderConfirmation
                        isOpenModal={isOpenModal}
                        namaTender={namaTender}
                        alamatTender={alamatTender}
                        nilaiTender={nilaiTender}
                        namaPemenang={namaPemenang}
                        npwpPemenang={npwpPemenang}
                        alamatPemenang={alamatPemenang}
                        selectedBranch={selectedBranch}
                        selectedAO={selectedAO}
                        handleCancel={closeModal}
                        submitAction={handleSubmit}
                    />
                )
            }
        </div>
    )
}