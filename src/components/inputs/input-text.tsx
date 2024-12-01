import { forwardRef } from "react";


interface InputTextProps{
    name?: string;
    placeholder?:string
    className?: string
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, ref) =>{
    return(
        <input
            ref={ref}
            type={props.type || "text"}
            name={props.name}
            className={"w-full border border-gray-300 rounded-lg p-2 " + props.className}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
        />
    )
})

InputText.displayName = "InputText";

export default InputText;