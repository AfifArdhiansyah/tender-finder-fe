'use client'

import Image from "next/image";

interface ResponseProps{
    message: string,
    subMessage?: string,
    type: 'error'|'success'|'empty'
}

export default function Response(props: ResponseProps){
    function getResponse(){
        if(props.type == 'error'){
            return (
                <>
                    <Image src="/icons/error.svg" width={70} height={70} alt="error"/>
                    <div className="flex flex-col items-center">
                        {props.message}
                        {props.subMessage && <p className="text-sm text-gray-400">{props.subMessage}</p>}
                    </div>
                </>
            )
        }
        else if(props.type == 'success'){
            return (
                <>
                    <Image src="/icons/success.svg" width={70} height={70} alt="success"/>
                    <div className="flex flex-col items-center">
                        {props.message}
                        {props.subMessage && <p className="text-sm text-gray-400">{props.subMessage}</p>}
                    </div>
                </>
            )
        }
        else if(props.type == 'empty') {
            return (
                <>
                    <Image src="/icons/empty-box.png" width={120} height={120} alt="empty"/>
                    <div className="flex flex-col items-center">
                        {props.message}
                        {props.subMessage && <p className="text-sm text-gray-400">{props.subMessage}</p>}
                    </div>
                </>
            )
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">{getResponse()}</div>
    )
}