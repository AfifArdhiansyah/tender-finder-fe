import toast from "react-hot-toast"
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useUserContext } from "@/contexts/useUserContext";


export default function ToastNotification({
    title,
    message,
    tenderId,
    role
}: {
    title: string,
    message: string,
    tenderId: string,
    role: string
}){
    const width = window.innerWidth;
    return (
         toast((t) => (
            <div className="flex justify-between gap-2">
                <Link href={(role=="ao"?"/ao-tender/":"/tender/")+tenderId} className="flex flex-col hover:text-blue-500" onClick={() => toast.dismiss(t.id)}>
                    <p className="font-bold max-md:text-sm">{title}</p>
                    <p className="max-md:text-xs">{message}</p>
                </Link>
                <button className="hover:text-blue-500" onClick={() => toast.dismiss(t.id)}>
                    <IoMdClose size={25}/>
                </button>
            </div>
        ), {
            position: width<640? "top-right" : "bottom-right",
            duration: 5000,
            id: "notification"
        })
    )
}