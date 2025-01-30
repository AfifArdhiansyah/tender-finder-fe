

export default function FeatureLandingPage() {
    return (
        <div id="feature" className="flex flex-col items-center justify-center py-16">
            <h1 className="text-2xl font-bold">Fitur bjb Tender Finder</h1>
            <ul className="flex flex-col gap-4 mt-8 px-6">
                <li className="flex gap-4 items-center">
                    <div className="max-md:w-5 max-md:h-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white">1</span>
                    </div>
                    <p>Menampilkan data pemenang tender</p>
                </li>
                <li className="flex gap-4 items-center">
                    <div className="max-md:w-5 max-md:h-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white">2</span>
                    </div>
                    <p>Update progres penawaran kredit oleh Account Officer</p>
                </li>
                <li className="flex gap-4 items-center">
                    <div className="max-md:w-5 max-md:h-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white">3</span>
                    </div>
                    <p>Memonitoring progres penawaran kredit</p>
                </li>
                <li className="flex gap-4 items-center">
                    <div className="max-md:w-5 max-md:h-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white">4</span>
                    </div>
                    <p>Notifikasi real-time update penawaran kredit</p>
                </li>
            </ul>
        </div>
    )
}