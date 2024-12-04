
interface InputTextAreaProps{
    placeholder?:string
    className?: string
    onChange?: Function
    value?: string
    disabled?: boolean
}

export default function InputTextArea(props: InputTextAreaProps){
    function handleChange(e: any){
        if(props.onChange) props.onChange(e.target.value)
    }

    return(
        <>
        {
            props.value? (
                <textarea className={"w-full border border-gray-300 rounded-lg p-2 "+ props.className} placeholder={props.placeholder} onChange={handleChange} value={props.value}/>
            ) : (
                <textarea className={"w-full border border-gray-300 rounded-lg p-2 "+ props.className} placeholder={props.placeholder} onChange={handleChange}/>
            )
        }
        </>
    )
}