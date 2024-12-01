import Image from "next/image"

export default function LoginTeas(){
    return(
        <div className="flex flex-col h-full w-full bg-blue-500 rounded-xl p-16">
            <div className="flex flex-col h-full w-full justify-center gap-6">
                <h2 className="text-3xl text-gray-200">Easy your work with bjb Tender Finder</h2>
                <p className="text-xs text-gray-200">Masukan NIP dan Password </p>
                <Image src={"/dashboard.png"} className="rounded-lg text-center w-full" width={500} height={500} alt="dashboard bjb tender finder"/>
            </div>
            <h2 className="text-xl text-gray-200 text-center">Divisi Komersil</h2>
        </div>
    )
}