import React, {ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUnreadContext } from "@/contexts/useMessageContext";

interface SidebarListChildProps{
    isActive: boolean,
    onClickChild: Function,
    navIndex: number,
    iconPath: string,
    label: string,
    ref: string,
    children?: ReactNode
}

export default function SidebarListChild(props: SidebarListChildProps){
    const { unreadCount } = useUnreadContext()
    function switchActiveClass(isActive: boolean):string{
        const activeClass = ""
        switch(isActive){
            case true:
                return activeClass + "bg-blue-500 text-white"
            case false:
                return activeClass + "text-gray-600"
        }
    }
    function switchCountActiveClass(isActive: boolean):string{
        const activeClass = ""
        switch(isActive){
            case true:
                return activeClass + "bg-white text-blue-500"
            case false:
                return activeClass + "bg-blue-500 text-white"
        }
    }
    async function onListClicked(){
        props.onClickChild(props.navIndex)
    }
    return (
        <Link href={props.ref} className={"w-full px-4 py-2 flex gap-4 items-center rounded-[10px] md:justify-center md:gap-1 lg:justify-start lg:gap-4 "+ switchActiveClass(props.isActive)} onClick={onListClicked}>
            <Image src={props.isActive? props.iconPath+"-active.png" : props.iconPath+".png"} alt="icon" width={20} height={20}/>
            <p className="md:hidden lg:block">{props.label}</p>
            {
                (props.label == "Notifikasi" && (unreadCount!=null && unreadCount>0)) && (
                    <div className={"rounded-full h-[18px] w-[18px] flex items-center justify-center text-xs " + switchCountActiveClass(props.isActive)}>{unreadCount}</div>
                )
            }
        </Link>
    )
}