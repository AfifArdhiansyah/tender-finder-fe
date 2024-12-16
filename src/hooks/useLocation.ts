import { useState, useEffect } from "react"


export const useGeoLocation = () =>{
    const [ltd, setLTD] = useState("0.00000")
    const [lng, setLNG] = useState("0.00000")

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLTD(position.coords.latitude.toString())
            setLNG(position.coords.longitude.toString())
        });
    }, [])

    return {ltd, lng}
}