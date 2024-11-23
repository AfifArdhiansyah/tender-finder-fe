import { HiMenu } from "react-icons/hi"

interface NavbarProps{
    toggleSidebar: Function
}

export default function Navbar(props: NavbarProps){
    return(
        <div className="bg-white">
            <div className="flex justify-between items-center py-6 px-6">
                <button className="md:hidden flex justify-between items-center p-4" onClick={props.toggleSidebar()} >
                    <HiMenu size={30}/>
                </button>
                <h2 className="font-bold text-lg max-md:text-md">Pusat Tata Surya</h2>
                <div className="flex flex-col text-grey max-md:text-sm">
                    <p>Data Terbaru:</p>
                    <p>28 Oktober, 06:23</p>
                </div>
            </div>
        </div>
    )
}