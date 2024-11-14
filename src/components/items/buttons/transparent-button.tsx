'use client'
import { ReactNode } from "react"

interface TransparentButtonProps{
    hoverBGColor: string,
    hoverTextColor: string,
    onClick: Function,
    disabled?: boolean,
    children?: ReactNode
}

export default function TransparentButton(props: TransparentButtonProps){

    function buttonClicked(){
        props.onClick()
    }

    return(
        <button className={"text-start w-full flex justify-between items-center hover:bg-"+props.hoverBGColor + " hover:text-"+props.hoverTextColor} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
}