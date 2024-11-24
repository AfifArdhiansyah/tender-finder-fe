import { ReactNode } from "react"

interface PillProps {
    type : "general" | "alert" | "danger" | "success" | "primary",
    size : "large" | "medium" | "small"
    className? : string,
    children? : ReactNode
}

function switchPillType(type: string):string{
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
            return "bg-blue-100 text-blue-700" 
        default:
            return "bg-gray-100 text-gray-700"
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
        <div className={"rounded-full px-3 py-1 flex items-center h-fit " + pillProps.className + " " + switchPillType(pillProps.type) + " " + switchPillSize(pillProps.size)}>
           {pillProps.children}
        </div>
    )
}