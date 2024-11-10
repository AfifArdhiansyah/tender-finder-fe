import Image from 'next/image'

export default function Sidebar(){
    return(
        <div className="flex flex-col px-4 py-8 items-center gap-6">
            <Image src={"/logo-bank-bjb.png"} width={100} height={200} alt='logo bank bjb'></Image>
            <ul>
                <li>Daftar Tender</li>
                <li>Inbox</li>
            </ul>
        </div>
    )
}