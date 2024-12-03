import { useState, useEffect } from "react";
import api from "@/services/api";
import { useCookies } from 'next-client-cookies';
import { UserModel } from "./useUser";

export const useAOs = () => {
    const [aos, setAOs] = useState<UserModel[]|null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const cookies = useCookies()
  
    useEffect(() => {
        const getAOs = async ()=>{
            setLoading(true);
            setError(null);
            const token = cookies.get("authToken")
            try {            
                const response = await api.get("/aos", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                })
    
                if (response.status != 200) {
                    const errorData = response.data;
                    throw new Error(errorData.message || "Failed to fetch user data");
                }
    
                const data: UserModel[] = response.data.data;
                setAOs(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        }
  
        getAOs();
    }, []);
  
    return { aos, loading, error };
  };