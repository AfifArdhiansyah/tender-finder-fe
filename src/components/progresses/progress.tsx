interface ItemProgress{
    label: string
    successed: boolean
    ignored?: boolean
    inProgress?: boolean
}

interface ProgressProps{
    items: ItemProgress[]
    visitedIndex: number
}

export default function Progress(props: ProgressProps){
    function getBGColor(item: ItemProgress){
        if(item.successed){
            return item.ignored?"bg-red-500 text-white":"bg-green-500 text-white"
        } else if(item.inProgress){
            return "bg-blue-500 text-white"
        } else {
            return "bg-gray-300"
        }
    }
    return(
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-between w-full">
                {
                    props.items.map((item, i)=>(
                        <div key={i} className="w-[20vw] text-center">
                            <p className={"text-xs " + (i==props.visitedIndex ? "text-blue-500 font-bold":"text-gray-500")}>{item.label}</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center w-full text-xs pl-[7.5vw]">
                {
                    props.items.map((item, i)=>(
                        <div key={i} className={"flex items-center "+(i<props.items.length-1?"w-[21vw]":"w-fit")}>
                            <div className={"w-[20px] h-[20px] flex items-center justify-center rounded-full " + getBGColor(item)}>
                                {item.ignored?<span className="font-bold">X</span>:i+1}
                            </div>
                            {
                                i!=props.items.length-1 && (
                                    <div className={"h-0.5 w-[78%] " + getBGColor(props.items[i+1])}></div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}