
interface InputTextProps{
    placeholder?:string
    className?: string
}

export default function InputText(props: InputTextProps){
    return(
        <input type="text" className={"w-full border border-gray-300 rounded-lg p-2 "+ props.className} placeholder={props.placeholder}/>
    )
}