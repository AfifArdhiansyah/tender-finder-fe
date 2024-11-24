import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

interface ResponseProps{
    message: string,
    type: 'error'|'success'
}

export default function Response(props: ResponseProps){
    function getResponse(){
        if(props.type == 'error'){
            return (
                <>
                    <IoCloseCircle size={80} className="text-red-500"/>
                    {props.message}
                </>
            )
        }
        else if(props.type == 'success'){
            return (
                <>
                    <IoCheckmarkCircle size={80} className="text-green-500"/>
                    {props.message}
                </>
            )
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">{getResponse()}</div>
    )
}