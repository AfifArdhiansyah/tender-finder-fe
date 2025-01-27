import { OfficeModel } from "@/models/office-model"
import { useEffect, useState } from "react"
import api from "@/services/api"


export const useGetOfficeByWilayah = (kanwilId: string) =>{
    const [offices, setOffices] = useState<OfficeModel[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [refreshOffice, setRefreshOffice] = useState(false)

    useEffect(()=>{
        const fetchOffices = async () => {
            setLoading(true)
            try {
                const response = await api.get("/offices/wilayah/"+kanwilId);
                setOffices(response.data.data as OfficeModel[]);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
    }, [refresh])

    function refresh(){
        setRefreshOffice(!refreshOffice)
    }

    return { offices, loading, error, refresh }
}

export const useGetOffice = () =>{
    const [offices, setOffices] = useState<OfficeModel[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function getOfficeByWilayah(kanwilId: string){
        try {
            const response = await api.get("/offices/wilayah/"+kanwilId);
            setOffices(response.data as OfficeModel[]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setLoading(false);
        }
    }

    async function getAllWilayah(){
        try {
            const response = await api.get("/offices/wilayah");
            setOffices(response.data as OfficeModel[]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setLoading(false);
        }
    }

    return { offices, loading, error, getOfficeByWilayah, getAllWilayah }
}