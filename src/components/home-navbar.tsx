'use client'
import Image from "next/image"
import Button from "./items/buttons/button"
import Link from "next/link";
import TransparentButton from "./items/buttons/transparent-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SwipeableDrawer } from "@mui/material";

export default function HomeNavbar() {
    const router = useRouter();
    const handleHome = () => {
        router.push("/");
    };
    const handleLogin = () => {
        router.push("/auth");
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const handleNavClick = (id: string) =>{
        const element = document.getElementById(id);
        setMenuOpen(false);
        if (element) {
            element.scrollIntoView();
        }
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className="flex justify-between items-center px-20 py-2 h-[10vh] max-md:px-10">
            <TransparentButton className="flex items-center gap-2" hoverBGColor={""} hoverTextColor={"blue-500"} onClick={handleHome}>
                <Image src="/logo-bank-bjb-only-icon.png" alt="Logo" width={40} height={40}/>
                <span className="text-xl font-bold">bjb Tender Finder</span>
            </TransparentButton>
            <div className="flex items-center gap-4 md:hidden">
                <button onClick={toggleMenu} className="text-xl">
                    &#9776; {/* Burger menu icon */}
                </button>
            </div>
            <SwipeableDrawer anchor="right" open={menuOpen} onClose={toggleMenu} onOpen={toggleMenu} >
                <div className="flex flex-col items-center gap-4 p-4">
                    <TransparentButton className="text-nowrap hover:text-blue-500" onClick={() => handleNavClick("feature")} hoverBGColor={""} hoverTextColor={""}>fitur</TransparentButton>
                    <TransparentButton className="text-nowrap hover:text-blue-500" onClick={() => handleNavClick("how-it-work")} hoverBGColor={""} hoverTextColor={""}>cara kerja</TransparentButton>
                    <Button onClick={handleLogin} type="primary" size="large">masuk</Button>
                </div>
            </SwipeableDrawer>
            <div className={`flex items-center gap-4 hidden md:flex`}>
                <Link className="text-nowrap hover:text-blue-500" href={"#feature"}>fitur</Link>
                <Link className="text-nowrap hover:text-blue-500" href={"#how-it-work"}>cara kerja</Link>
                <Button onClick={handleLogin} type="primary" size="large">masuk</Button>
            </div>
        </div>
    )
}