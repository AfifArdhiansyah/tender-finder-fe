import Image from "next/image"

export default function HowItWorkLandingPage() {
    return (
        <div id="how-it-work" className="flex flex-col items-center justify-center py-16">
            <h1 className="text-2xl font-bold">Cara Kerja bjb Tender Finder</h1>
            <Image className="w-[80vw]" src={"/how-it-work.png"} alt={"how it work"} width={1200} height={1200} />
        </div>
    )
}