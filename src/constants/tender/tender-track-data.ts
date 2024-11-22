import { TenderTrackModel } from "@/models/tender-track-model";

export const TenderTrackDumpData = [
    {
        label: "Dikunjungi",
        datetime: "29 Oktober 2024  - 10.00",
        deskripsi: "AO telah mengunjungi pemenang tender",
        ltd_loc: "-6.281819326",
        lng_loc: "106.7993686"
    },
    {
        label: "Penawaran",
        datetime: "30 Oktober 2024  - 10.00",
        deskripsi: "AO telah menawarkan kredit ke pemenang tender",
        ltd_loc: "-6.281819326",
        lng_loc: "106.7993686",
        penawaran_diterima: true
    },
    {
        label: "Pengajuan Kredit",
        datetime: "31 Oktober 2024  - 10.00",
        deskripsi: "Pemenang Tender berminat Kredit di bank bjb",
        produk: "KMKK (Kredir Modak Kerja)",
        nilai_kredit: "478404276"
    },
    {
        label: "Kredit Ditolak Coyyy Aelahh",
        datetime: "1 November 2024  - 10.00",
        deskripsi: "Pengajuan kredit telah ditolak manajemen",
        pencairan_diterima: false
    }
] as TenderTrackModel[]