'use client'
import { ReactNode } from "react"

interface TransparentButtonProps{
    hoverBGColor: string,
    hoverTextColor: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
    children?: ReactNode
}

export default function TransparentButton(props: TransparentButtonProps){

    function buttonClicked(){
        props.onClick()
    }

    return(
        <button className={"text-start w-full hover:bg-"+props.hoverBGColor + " hover:text-"+props.hoverTextColor + " " + props.className} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
}