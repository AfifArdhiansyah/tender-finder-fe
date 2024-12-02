import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { HiMenu } from "react-icons/hi"

interface NavbarProps{
    toggleSidebar: Function
}

export default function Navbar(props: NavbarProps){
    const {role} = useUser()
    const [currRole, setCurrRole] = useState(role)
    useEffect(() => {
        setCurrRole(role)
    }, [role])
    function getTitle(){
        switch(currRole){
            case 'manager-pusat':
                return 'Kantor Pusat'
            case 'manager-kanwil':
                return 'Kantor Wilayah'
            case 'manager-cabang':
                return 'Kantor Cabang'
            case 'ao':
                return 'Account Officer'
            default:
                return 'Kantor Pusat'
        }
    }
    return(
        <div className="bg-white flex justify-between items-center py-6 px-6 max-md:px-4">
            <div className="max-md:flex max-md:gap-4 max-md:items-center">
                <button className="md:hidden flex justify-between items-center" onClick={props.toggleSidebar()} >
                    <HiMenu size={30}/>
                </button>
                <h2 className="font-bold text-lg max-md:text-sm">{getTitle()}</h2>
            </div>
            <div className="flex flex-col text-grey max-md:text-sm">
                <p>Data Terbaru:</p>
                <p>28 Oktober, 06:23</p>
            </div>
        </div>
    )
}