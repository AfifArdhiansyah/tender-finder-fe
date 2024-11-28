
interface InputTextAreaProps{
    placeholder?:string
    className?: string
}

export default function InputTextArea(props: InputTextAreaProps){
    return(
        <textarea className={"w-full border border-gray-300 rounded-lg p-2 "+ props.className} placeholder={props.placeholder}/>
    )
}