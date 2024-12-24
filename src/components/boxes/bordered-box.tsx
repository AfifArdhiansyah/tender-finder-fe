import { ReactNode } from "react";

interface BorderedBoxProps{
    className?: string
    children?: ReactNode
}

export default function BorderedBox(props: BorderedBoxProps){
    return(
        <div className={"border md:border-2 border-gray-200 rounded-lg px-4 py-2 " + props.className}>
            {props.children}
        </div>
    )
}