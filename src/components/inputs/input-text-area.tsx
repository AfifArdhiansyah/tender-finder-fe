
interface InputTextAreaProps{
    placeholder?:string
    className?: string
    onChange?: (value: string) => void
    value?: string
    disabled?: boolean
}

export default function InputTextArea(props: InputTextAreaProps){
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        if(props.onChange) props.onChange(e.target.value)
    }

    return(
        <>
        {
            props.value? (
                <textarea className={"w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 "+ props.className} placeholder={props.placeholder} onChange={handleChange} value={props.value} disabled={props.disabled}/>
            ) : (
                <textarea className={"w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 "+ props.className} placeholder={props.placeholder} onChange={handleChange} disabled={props.disabled}/>
            )
        }
        </>
    )
}