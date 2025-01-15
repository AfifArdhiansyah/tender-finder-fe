'use client'

import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb";
import DashboardLayout from "@/layouts/dashboard-layout";
import Paper from "@/components/frames/papes";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response";
import Button from "@/components/items/buttons/button";
import { useUserContext } from "@/contexts/useUserContext";

export default function User(){
    const bcItems = [
        {label: "Personal Info", path: "/user"}
    ] as BreadcrumbItem[]
    const { user, loading, error } = useUserContext();
    const {logout} = useAuth()
    function getRole(role:string){
        switch(role){
            case 'ao':
                return 'Account Officer'
            default:
                return 'Manager'
        }
    }
    function getKantor(role:string){
        switch(role){
            case 'manager-pusat':
                return 'Kantor Pusat'
            case 'manager-kanwil':
                return 'Kantor Wilayah'
            case 'manager-cabang':
                return 'Kantor Cabang'
            case 'ao':
                return 'Kantor Cabang'
            default:
                return 'Kantor Pusat'
        }
    }
    const handleLogout = async () => {
        await logout()
    };
    return(
        <DashboardLayout sideNavIndex={10} bcItems={bcItems}>
            {
                loading ? (
                    <Loading/>
                ) : error ? (
                    <Response type="error" message={error}/>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Paper className="flex flex-col gap-6 pb-6">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-lg">Informasi Pegawai</h3>
                                <p className="text-sm text-gray-500">Informasi dasar pegawai, jika ada kesalahan data anda dapat menghubungi tim manajemen</p>
                            </div>
                            <div className="grid grid-cols-12 gap-2 max-md:text-sm">
                                <p className="col-span-4 md:col-span-2">Foto Profile</p>
                                <Image src={user?.role=="ao"?"/manager2.png":"/manager.png"} width={120} height={120} className='rounded col-span-8 md:col-span-10' alt='foto-profile' />
                                <p className="col-span-4 md:col-span-2">Nama</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.nama}</span></p>
                                <p className="col-span-4 md:col-span-2">NIP</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.nip}</span></p>
                                <p className="col-span-4 md:col-span-2">Posisi</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{getRole(user?.role as string)}</span></p>
                                <p className="col-span-4 md:col-span-2">Lokasi</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{getKantor(user?.role as string)}</span></p>
                            </div>
                            <Button type={"danger"} size={"medium"} onClick={handleLogout} className="w-fit">logout</Button>
                        </Paper>
                        <Paper className="flex flex-col gap-6 pb-6">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-lg">Informasi Kantor</h3>
                                <p className="text-sm text-gray-500">Informasi kantor pegawai</p>
                            </div>
                            <div className="grid grid-cols-12 gap-2 max-md:text-sm">
                                <p className="col-span-4 md:col-span-2">Nama</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.office.nama}</span></p>
                                <p className="col-span-4 md:col-span-2">Alamat</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.office.alamat}</span></p>
                                <p className="col-span-4 md:col-span-2">Tipe</p>
                                <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.office.type}</span></p>
                            </div>
                        </Paper>
                    </div>
                )
            }
        </DashboardLayout>
    )
}