import { ReactNode } from "react"

interface PillProps {
    type : "general" | "alert" | "danger" | "success",
    size : "large" | "medium" | "small"
    children : ReactNode
}

function switchPillType(type: string):string{
    switch(type){
        case "general":
            return "bg-gray-200 text-gray-600"
        case "alert":
            return "bg-yellow-200 text-yellow-600" 
        case "danger":
            return "bg-red-200 text-red-600" 
        case "success":
            return "bg-green-200 text-green-600" 
        default:
            return "bg-gray-200 text-gray-600"
    }
}

function switchPillSize(size: string):string{
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

export default function Pill(pillProps : PillProps){
    
    return (
        <div className={"rounded-full px-2 py-1 flex items-center h-fit " + switchPillType(pillProps.type) + " " + switchPillSize(pillProps.size)}>
           {pillProps.children}
        </div>
    )
}