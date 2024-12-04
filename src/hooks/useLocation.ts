import { useState, useEffect } from "react"


export const useGeoLocation = () =>{
    const [ltd, setLTD] = useState("")
    const [lng, setLNG] = useState("")

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLTD(position.coords.latitude.toString())
            setLNG(position.coords.longitude.toString())
        });
    }, [])

    return {ltd, lng}
}