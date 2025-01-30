'use client'

import Link from "next/link";
import Image from "next/image";
import TransparentButton from "@/components/items/buttons/transparent-button";
import { useRouter } from "next/navigation";

export default function FooterLandingPage() {
    const router = useRouter();
    const handleHome = () => {
        router.push("/#home");
    };
    return (
        <div className="flex gap-8 justify-center py-16 bg-blue-500 text-white">
            <div className="flex flex-col gap-10 items-center">
                <div className="flex gap-16 items-start max-md:flex-col">
                    <TransparentButton className="flex items-center gap-2" hoverBGColor={""} hoverTextColor={""} onClick={handleHome}>
                        <Image className="w-[30px] h-[30px]" src="/logo-bank-bjb-only-icon-white.png" alt="Logo" height={50} width={50}/>
                        <h1 className="text-2xl font-bold">bjb Tender Finder</h1>
                    </TransparentButton>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Kantor Pusat bank bjb</p>
                        <ul>
                            <li>Menara bank bjb</li>
                            <li>Divisi Corporate Secretary</li>
                            <li>Jl.Naripan No. 12-14</li>
                            <li>Bandung - 40111</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Kontak bank bjb</p>
                        <ul>
                            <li>Telp : 022 - 4234868</li>
                            <li>Fax : 022 - 4206099</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Menu</p>
                        <ul>
                            <li>
                                <Link href={"#feature"}>fitur</Link>
                            </li>
                            <li>
                                <Link href={"#how-it-work"}>cara kerja</Link>
                            </li>
                            <li>
                                <Link href={"/auth"}>masuk</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="text-sm">© 2024 bjb Tender Finder. All rights reserved.</p>
            </div>
        </div>
    )
}