'use client'
import { ReactNode } from "react"

interface TextButtonProps{
    type: "general" | "alert" | "danger" | "success" | "primary" | "disable",
    size: "small" | "medium" | "large"
    onClick: Function,
    disabled?: boolean,
    children?: ReactNode
}

export default function TextButton(props: TextButtonProps){
    function switchButtonType(type: string):string{
        switch(type){
            case "general":
                return "text-gray-700"
            case "alert":
                return "text-yellow-700" 
            case "danger":
                return "text-red-700" 
            case "success":
                return "text-green-700" 
            case "primary":
                return "text-blue-700" 
            case "disable":
                return "text-gray-300" 
            default:
                return "text-gray-700"
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
        <button className={switchButtonType(props.type) + " " + switchButtonSize(props.size)} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
}