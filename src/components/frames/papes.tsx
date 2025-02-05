'use client'

import { ReactNode } from "react"

interface PaperProps{
    className?: string
    children?: ReactNode
}

export default function Paper(props: PaperProps){
    return(
        <div className={ "bg-white rounded-md p-4 " + props.className}>
            {props.children}
        </div>
    )
}