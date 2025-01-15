'use client'

import BorderedBox from "@/components/boxes/bordered-box";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { ReactNode } from "react";
import { Tooltip } from "@mui/material";
import { useUserContext } from "@/contexts/useUserContext";

interface SummaryBoxProps{
    count: number
    status: string
    color?: string
    className?: string
    children?: ReactNode
    branchId?: string
    stateIndex?: number
}

export default function SummaryBox(props: SummaryBoxProps){
    const cookies = useCookies();
    const {user} = useUserContext()
    const role = user?.role
    const goToTender = ()=>{
        if(role == "manager-kanwil" && props.stateIndex==2 && props.branchId){
            cookies.set("selected-branch", props.branchId)
        }
        switch(props.status){
            case "belum ada AO":
                cookies.set("selected-status", "-1")
                break;
            case "belum ditawarkan":
                cookies.set("selected-status", "0")
                break;
            case "telah ditawarkan":
                cookies.set("selected-status", "1")
                break;
            case "telah follow up":
                cookies.set("selected-status", "2")
                break;
            case "debitur tertarik":
                cookies.set("selected-status", "3")
                break;
            case "debitur tidak tertarik":
                cookies.set("selected-status", "4")
                break;
            case "pencairan diterima":
                cookies.set("selected-status", "5")
                break;
            case "pencairan ditolak":
                cookies.set("selected-status", "6")
        }
    }
    return(
        <Tooltip title={"lihat detail data"} placement="top" arrow>
            <Link href="/tender" onClick={goToTender}>
                <BorderedBox className={"group items-center flex justify-between " + props.className}>
                    <div className="flex gap-2 items-center max-md:text-sm">
                        {props.children}
                    </div>
                    <p className={"text-2xl font-bold max-md:text-lg "+props.color}>{props.count}</p>
                </BorderedBox>
            </Link>
        </Tooltip>
    )
}