import BorderedBox from "@/components/boxes/bordered-box";
import { TenderStatusModel } from "@/models/tender-status-model";
import Image from "next/image";

interface TenderProgresPenyetujuanProps{
    statusData: TenderStatusModel
}

export default function TenderProgresPenyetujuan(props: TenderProgresPenyetujuanProps){
    const penyetujuan = {
        disetujui: false,
        catatan: "Pengajuan kredit ditolak dikarenakan calon debitur tidak sesuai dengan kriteria",
    }
    return(
        <div className="flex flex-col gap-4 text-xs">
            <p className="font-bold">Status Penyetujuan Kredit:</p>
            {
                props.statusData.dibuat_tanggal? (
                    <>
                        <BorderedBox className="flex gap-2 items-center">
                        {
                            penyetujuan.disetujui ? <>
                                <Image src={"/icons/check.svg"} alt={"accepted"} width={20} height={20} />
                                <p>Kredit Disetujui</p>
                            </> : <>
                                <Image src={"/icons/ignore.svg"} alt={"ignored"} width={20} height={20} />
                                <p>Kredit Ditolak</p>
                            </>
                        }
                        </BorderedBox>  
                        <p className="font-bold">Feedback dari manajemen:</p>
                        <BorderedBox className="text-gray-500">{penyetujuan.catatan}</BorderedBox>
                    </>
                ) : (
                    <p className="text-gray-500">menunggu keputusan dari manajemen, hubungi manager anda untuk melakukan follow up keputusan kredit ini</p>
                )
            }
        </div>
    )
}