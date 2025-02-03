export interface SummaryModel{
    total_tender: number,
    total_pemenang_baru: number,
    total_penawaran: number,
    total_mengajukan_kredit: number,
    total_tidak_mengajukan_kredit: number,
    total_kredit_disetujui: number,
    total_kredit_tidak_disetujui: number,
    total_diserap: number,
    total_tidak_diserap: number,
    total_nilai_tender: number,
    percent_diserap: number,
    percent_tidak_diserap: number,
    percent_mengajukan_kredit: number,
    percent_tidak_mengajukan_kredit: number,
    percent_mengajukan_kredit_sisa: number,
    percent_kredit_disetujui: number,
    percent_kredit_tidak_disetujui: number,
    percent_kredit_disetujui_sisa: number,
}

export interface SummaryPusatModel{
    id: number,
    kanwil_id: number,
    total_pemenang_baru: number,
    percent_kredit_disetujui: number,
    total_diserap: number,
    percent_mengajukan_kredit: number
}

export interface SummaryKanwilModel{
    id: number,
    nama: string,
    total_pemenang_baru: number,
    percentage_status_success_rate: number,
    total_daya_serap: number,
    percentage_status_pengajuan_kredit:number,
}

export interface SummaryCabangModel{
    user_id: number,
    user_nama: string,
    user_nip: string,
    office_id: number,
    office_nama: string,
    office_kota_kab: string,
    office_alamat: string,
    kanwil_id: number,
    tender_id: string,
    tender_nama: string,
    tender_nama_pemenang: string,
    tender_lokasi_pekerjaan: string,
    tender_npwp: string,
    tender_lokasi_instansi: string,
    tender_nilai_tender: number,
    tender_nilai_kredit: number
}