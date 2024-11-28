
interface ProgressProps{
    items: {
        label: string
        successed: boolean
    }[]
    visitedIndex: number
}

export default function Progress(props: ProgressProps){
    return(
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-between w-full">
                {
                    props.items.map((item, i)=>(
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-[20vw] text-center">
                                <p className={"text-xs " + (i==props.visitedIndex ? "text-blue-500 font-bold":"text-gray-500")}>{item.label}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center w-full text-xs px-[6.5vw]">
                {
                    props.items.map((item, i)=>(
                        <div key={i} className="flex items-center w-full">
                            <div className={"w-[20px] h-[20px] flex items-center justify-center rounded-full "+(item.successed?"bg-blue-500 text-white":"bg-gray-300")}>
                                {i+1}
                            </div>
                            {
                                i!=props.items.length-1 && (
                                    <div className={"h-0.5 w-[16vw] " + (props.items[i+1]?.successed?"bg-blue-500":"bg-gray-300")}></div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}