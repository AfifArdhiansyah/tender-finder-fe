import { ReactNode } from "react";

interface SidebarListProps {
    children: ReactNode
}

export default function SidebarList(props: SidebarListProps) {
    return(
        <div className="w-full flex flex-col gap-2">
            {props.children}
        </div>
    )
}