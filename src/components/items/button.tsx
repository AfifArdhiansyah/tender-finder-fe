'use client'
import { ReactNode } from "react"

interface ButtonProps{
    type: "general" | "alert" | "danger" | "success" | "primary" | "disable",
    size: "small" | "medium" | "large"
    onClick: Function,
    disabled?: boolean,
    children?: ReactNode
}

export default function Button(props: ButtonProps){
    function switchButtonType(type: string):string{
        switch(type){
            case "general":
                return "bg-gray-100 text-gray-700"
            case "alert":
                return "bg-yellow-100 text-yellow-700" 
            case "danger":
                return "bg-red-100 text-red-700" 
            case "success":
                return "bg-green-100 text-green-700" 
            case "primary":
                return "bg-blue-600 text-white" 
            case "disable":
                return "bg-gray-100 text-gray-300" 
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
        <button className={"rounded-md px-3 py-1 flex items-center h-fit " + switchButtonType(props.type) + " " + switchButtonSize(props.size)} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
}