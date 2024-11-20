import BorderedBox from "@/components/boxes/bordered-box";
import { ReactNode } from "react";

interface SummaryBoxProps{
    count: number
    color?: string
    className?: string
    children?: ReactNode
}

export default function SummaryBox(props: SummaryBoxProps){
    return(
        <BorderedBox className={props.className + " items-center flex justify-between"}>
            <div className="flex gap-2 items-center">
                {props.children}
            </div>
            <p className={"text-2xl font-bold "+props.color}>{props.count}</p>
        </BorderedBox>
    )
}