import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { useCookies } from 'next-client-cookies';

export interface Office {
    id: number,
    kota_kab: string,
    nama: string,
    alamat: string,
    ltd_loc: string,
    lng_loc: string,
    type: string,
    kanwil_id: 1,
}

export interface UserModel {
    id: number,
    nip: string,
    nama: string,
    is_active: boolean,
    role: string,
    office_id: number,
    office: Office,
    created_at: string,
    updated_at: string
}

interface UseUserReturn {
    user: UserModel | null;
    loading: boolean;
    error: string | null;
    fetchUser: () => Promise<void>;
}

export function useUser(): UseUserReturn {
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cookies = useCookies();

    const fetchUser = async () => {
        setLoading(true);
        setError(null);

        const token = cookies.get("authToken");

        if (!token) {
            setError("Authentication token not found");
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.status !== 200) {
                const errorData = response.data;
                throw new Error(errorData.message || "Failed to fetch user data");
            }

            const data: UserModel = response.data.data;
            setUser(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
            toast.error(
                err instanceof Error ? err.message : "Failed to load user data"
            );
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, fetchUser };
}