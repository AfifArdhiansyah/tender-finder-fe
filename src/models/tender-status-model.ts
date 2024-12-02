import { StatusModel } from "./status-model";

export interface TenderStatusModel{
    id: number,
    dibuat_tanggal: string,
    ltd_loc: string | null,
    lng_loc: string | null,
    penawaran_file: string | null,
    bukti_file: string | null,
    keterangan: string | null,
    tender_id: string,
    status_id: number,
    created_at: string,
    updated_at: string,
    produk_dipilih: string,
    status: StatusModel
}