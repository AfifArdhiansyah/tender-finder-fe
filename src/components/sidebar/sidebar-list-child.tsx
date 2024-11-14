import React, {ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

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
    function switchActiveClass(isActive: boolean):string{
        const activeClass = ""
        switch(isActive){
            case true:
                return activeClass + "bg-blue-600 text-white"
            case false:
                return activeClass + "text-gray-600"
        }
    }
    function onListClicked(){
        props.onClickChild(props.navIndex)
    }
    return (
        <Link href={props.ref} className={"w-full px-4 py-2 flex gap-4 items-center rounded-[10px] "+ switchActiveClass(props.isActive)} onClick={onListClicked}>
            <Image src={props.isActive? props.iconPath+"-active.png" : props.iconPath+".png"} alt="icon" width={20} height={20}/>
            <p>{props.label}</p>
        </Link>
    )
}