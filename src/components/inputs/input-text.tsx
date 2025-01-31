import { forwardRef, useState } from "react";

interface InputTextProps{
    name?: string;
    placeholder?:string
    className?: string
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    maxLength?: number;
    prefix?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, ref) =>{
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return(
        props.prefix ? (
            <div className={`flex items-center border rounded-md border-gray-300 w-full h-full ${isFocused ? 'border-blue-500' : 'border-gray-300'}`} >
                <p className="z-10 ml-2 text-sm">{props.prefix}</p>
                <input
                    ref={ref}
                    type={props.type || "text"}
                    name={props.name}
                    className={"flex-1 pl-3 pr-3 py-2 text-sm rounded-md w-full h-full focus:outline-0 " + props.className}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    disabled={props.disabled}
                    maxLength={props.maxLength}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        ) : (
            <input
                ref={ref}
                type={props.type || "text"}
                name={props.name}
                className={"w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 " + props.className}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                disabled={props.disabled}
                maxLength={props.maxLength}
            />
        )
    )
})

InputText.displayName = "InputText";

export default InputText;