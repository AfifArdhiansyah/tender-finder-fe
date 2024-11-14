import Link from "next/link";
import { ReactNode } from "react";

interface TextLinkProps{
    type: "general" | "alert" | "danger" | "success" | "primary",
    path: string,
    children?: ReactNode
}

export default function TextLink(props: TextLinkProps){
    function switchLinkType(type: string):string{
        switch(type){
            case "general":
                return "text-gray-600"
            case "alert":
                return "text-yellow-600" 
            case "danger":
                return "text-red-600" 
            case "success":
                return "text-green-600" 
            case "primary":
                return "text-blue-600" 
            default:
                return "text-gray-600"
        }
    }
    return (
        <Link className={switchLinkType(props.type)} href={props.path}>{props.children}</Link>
    )
}