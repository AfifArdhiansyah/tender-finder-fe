'use client'
import Image from 'next/image'
import Button from '@/components/items/buttons/button'
import { useRouter } from 'next/navigation';

export default function HomeLandingPage() {
    const router = useRouter();
    const handleLogin = () => {
        router.push("/auth");
    };
    return(
        <div id='home' className="flex justify-center items-center h-[80vh] px-20">
            <div className="flex gap-12 items-center">
                <Image className='max-md:hidden' src={"/dashboard.png"} alt={"logo"} height={800} width={800}/>
                <div className="flex flex-col items-center gap-8">
                    <p className='text-center text-lg'><span className='text-blue-500'>bjb Tender Finder</span> adalah sebuah platform yang dapat memudahkan anda dalam mencari dan mengolah data pemenang tender di projek pemerintahan daerah</p>
                    <div className='flex flex-col gap-2'>
                        <p className='text-center text-lg'>masuk untuk memulai aplikasi bjb Tender Finder</p>
                        <Button onClick={handleLogin} type={"primary"} size={"medium"}>masuk</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}