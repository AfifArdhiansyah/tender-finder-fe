export interface TenderAOModel{
    id: string,
    nama: string,
    nama_pemenang: string,
    alamat_pemenang: string,
    nilai_tender: string,
    status: string,
    ao: {
        nip: string
        nama: string
    },
    produk: {
        nama: string
    }
}