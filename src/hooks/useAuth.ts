'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/services/api";
import { useCookies } from 'next-client-cookies';
import { Office } from "./useUser";
import { useUserContext } from "@/contexts/useUserContext";

interface LoginResponse {
    data: {
        token: string,
        nama: string,
        role: string,
        office_name: string,
        office_id: string
    },
    message: string
}

interface LogoutResponse {
    success: boolean,
    data: any,
    message: string
}

interface UseAuthReturn {
    login: (nip: string, password: string) => Promise<void>;
    logout: ()=>Promise<void>
    error: string | null;
    loading: boolean;
}

export function useAuth(): UseAuthReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const cookies = useCookies();
    const { resetUser, fetchUser } = useUserContext()

    const login = async (nip: string, password: string) => {
        setLoading(true);
        setError(null);
        resetUser();
        const toastId = toast.loading("Logging in...");
        try {            
            const response = await api.post("/login", JSON.stringify({ nip, password }))

            if (response.status != 200) {
                const errorData = await response.data;
                throw new Error(errorData.message || "Login failed");
            }

            const data: LoginResponse = await response.data;

            cookies.set("authToken", data.data.token);
            cookies.set("office-id", data.data.office_id)
            toast.success("Login successful!", { id: toastId });

            await fetchUser();

            if(data.data.role == "ao"){
                router.push("/ao-dashboard");
            }else{
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "An unexpected error occurred",
                { id: toastId }
            );
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const logout = async ()=>{
        setLoading(true);
        setError(null);
        const toastId = toast.loading("Logging in...");
        const token = cookies.get("authToken")
        try {            
            const response = await api.get("/logout", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            if (response.status != 200) {
                const errorData = await response.data;
                throw new Error(errorData.message || "Logout failed");
            }
            const data: LogoutResponse = await response.data;

            cookies.remove("authToken")
            cookies.remove("office-id")

            resetUser()
            toast.success("Logout successful!", { id: toastId });

            router.push("/auth");
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "An unexpected error occurred",
                { id: toastId }
            );
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { login, logout, error, loading };
}