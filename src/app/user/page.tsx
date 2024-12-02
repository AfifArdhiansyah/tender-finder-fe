'use client'

import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumb";
import DashboardLayout from "@/layouts/dashboard-layout";
import Paper from "@/components/frames/papes";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/items/progress/loading"
import Response from "@/components/items/responses/response";
import Button from "@/components/items/buttons/button";

export default function User(){
    const bcItems = [
        {label: "Personal Info", path: "/user"}
    ] as BreadcrumbItem[]
    const { user, loading, error } = useUser();
    const {logout} = useAuth()
    function getRole(role:string){
        switch(role){
            case 'manager-pusat':
                return 'Manager'
            case 'manager-kanwil':
                return 'Manager Kanwil'
            case 'manager-kc':
                return 'Manager KC'
            case 'ao':
                return 'Account Officer'
            default:
                return 'Manager'
        }
    }
    const handleLogout = async () => {
        await logout()
    };
    return(
        <DashboardLayout sideNavIndex={10} bcItems={bcItems}>
            <Paper className="flex flex-col gap-6 pb-6">
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-lg">Informasi Pegawai</h3>
                    <p className="text-sm text-gray-500">Informasi dasar pegawai, jika ada kesalahan data anda dapat menghubungi tim manajemen</p>
                </div>
                {
                    loading ? (
                        <Loading/>
                    ) : error ? (
                        <Response type="error" message={error}/>
                    ) : (
                        <div className="grid grid-cols-12 gap-2">
                            <p className="col-span-4 md:col-span-2">Foto Profile</p>
                            <Image src={user?.role=="ao"?"/manager2.png":"/manager.png"} width={80} height={80} className='rounded-full col-span-8 md:col-span-10' alt='foto-profile' />
                            <p className="col-span-4 md:col-span-2">Nama</p>
                            <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.nama}</span></p>
                            <p className="col-span-4 md:col-span-2">NIP</p>
                            <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{user?.nip}</span></p>
                            <p className="col-span-4 md:col-span-2">Posisi</p>
                            <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{getRole(user?.role as string)}</span></p>
                            <p className="col-span-4 md:col-span-2">Lokasi</p>
                            <p className="col-span-8 md:col-span-10">: <span className="text-gray-500">{"Kantor Pusat"}</span></p>
                        </div>
                    )
                }
                <Button type={"danger"} size={"medium"} onClick={handleLogout} className="w-fit">logout</Button>
            </Paper>
        </DashboardLayout>
    )
}