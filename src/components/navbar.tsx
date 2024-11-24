import { HiMenu } from "react-icons/hi"

interface NavbarProps{
    toggleSidebar: Function
    role?: 'manager-pusat' | 'manager-kanwil' | 'manager-kc' | 'ao'
}

export default function Navbar(props: NavbarProps){
    function getTitle(){
        switch(props.role){
            case 'manager-pusat':
                return 'Pusat Tata Surya'
            case 'manager-kanwil':
                return 'Kantor Wilayah'
            case 'manager-kc':
                return 'Kantor Cabang'
            case 'ao':
                return 'Account Officer'
            default:
                return 'Pusat Tata Surya'
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