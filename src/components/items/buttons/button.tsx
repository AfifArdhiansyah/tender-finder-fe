'use client'
import { ReactNode } from "react"

interface ButtonProps{
    type: "general" | "alert" | "danger" | "success" | "primary" | "disable",
    size: "small" | "medium" | "large"
    onClick: () => void,
    disabled?: boolean,
    children?: ReactNode
    className?: string
}

export default function Button(props: ButtonProps){
    function switchButtonType(type: string):string{
        switch(type){
            case "general":
                return "bg-gray-100 text-gray-700"
            case "alert":
                return "bg-yellow-100 text-yellow-700" 
            case "danger":
                return "bg-red-500 text-white" 
            case "success":
                return "bg-green-100 text-green-700" 
            case "primary":
                return "bg-blue-500 text-white hover:bg-blue-600" 
            case "disable":
                return "bg-gray-100 text-gray-400" 
            default:
                return "bg-gray-100 text-gray-700"
        }
    }
    
    function switchButtonSize(size: string):string{
        switch(size){
            case "medium":
                return "text-md"
            case "small":
                return "text-sm" 
            case "large":
                return "text-lg" 
            default:
                return "text-md"
        }
    }

    function buttonClicked(){
        props.onClick()
    }

    return(
        <button className={"rounded-md px-3 py-1 flex items-center h-fit justify-center " + switchButtonType(props.type) + " " + switchButtonSize(props.size) + " " + props.className} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
}