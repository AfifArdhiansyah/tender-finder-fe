'use client';

import { TenderProjectModel } from "@/models/tender-project-model";
import { useState } from "react";
import { getGeocode } from "@/services/geocode";
import { MapModal } from "@/components/maps/map-modal";

interface TenderDetailTableProps{
    idTender: string
    tenderProject?: TenderProjectModel
}

export default function TenderDetailTable(props: TenderDetailTableProps){

    const [geocode, setGeocode] = useState<{ lat: number, lng: number } | null>(null);
    const [labelModalMap, setLabelModalMap] = useState<string>("")
    const handleAddressClick = async (address: string, label: string) => {
        setLabelModalMap(label);
        const location = await getGeocode(address);
        if (location) {
            setGeocode(location);
            openMapPenawaranModal();
        }
    };

    const [showMapPenawaranModal, setShowMapPenawaranModal] = useState<boolean>(false);
    const openMapPenawaranModal = () => {
        setShowMapPenawaranModal(true);
    }
    const closeMapPenawaranModal = () => {
        setShowMapPenawaranModal(false);
    }
    
    return(
        <div className="grid grid-cols-12 gap-y-2 text-sm">
            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nomor Tender</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {props.tenderProject?.id}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama Tender</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {props.tenderProject?.nama}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama Pemenang</p>
            <p onClick={()=>handleAddressClick(props.tenderProject?.nama_pemenang as string, "Lokasi Pemenang Tender")} className="text-blue-500 col-span-10 max-md:col-span-7 max-lg:col-span-8 cursor-pointer"><span className="font-bold mr-2">:</span> {props.tenderProject?.nama_pemenang}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nominal Tender</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> Rp. {parseFloat(props.tenderProject?.nilai_tender as string).toLocaleString('id-ID')}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Alamat Tender</p>
            <p onClick={()=>handleAddressClick(props.tenderProject?.lokasi_pekerjaan as string, "Lokasi Pekerjaan Tender")} className="text-blue-500 col-span-10 max-md:col-span-7 max-lg:col-span-8 cursor-pointer"><span className="font-bold mr-2">:</span> {props.tenderProject?.lokasi_pekerjaan}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Cabang Inisiatior</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {props.tenderProject?.branch.nama}</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Nama AO</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {props.tenderProject?.account_officer?.nama || "belum ada AO"}</p>

            {/* <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Dokumen Tanda Terima</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> ini dokumen tanda terima</p>

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Foto Follow Up</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> ini data follow up</p> */}

            <p className="font-bold col-span-2 max-md:col-span-5 max-lg:col-span-4">Status Saat Ini</p>
            <p className="text-gray-500 col-span-10 max-md:col-span-7 max-lg:col-span-8"><span className="font-bold mr-2">:</span> {props.tenderProject?.tender_statuses[props.tenderProject.tender_statuses?.length-1].status.nama}</p>

            {
                showMapPenawaranModal && <MapModal 
                    title={labelModalMap} 
                    subTitle="Lokasi tempat projek tender dilaksanakan"
                    isOpenModal={showMapPenawaranModal} 
                    onCancel={closeMapPenawaranModal} 
                    latitude={geocode?.lat as number} 
                    longitude={geocode?.lng as number} 
                />
            }
        </div>
    )
}