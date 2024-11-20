import { ReactNode } from "react";

interface BorderedBoxProps{
    className?: string
    children?: ReactNode
}

export default function BorderedBox(props: BorderedBoxProps){
    return(
        <div className={props.className + " border-2 border-gray-200 rounded-md px-4 py-2"}>
            {props.children}
        </div>
    )
}