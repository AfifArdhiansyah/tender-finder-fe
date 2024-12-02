'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { useCookies } from 'next-client-cookies';

interface User {
    id: number,
    nip: string,
    nama: string,
    is_active: boolean,
    role: string,
    office_id: number,
    created_at: string,
    updated_at: string
}

interface UseUserReturn {
    user: User | null;
    name: string;
    role: string
    loading: boolean;
    error: string | null;
}

export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const cookies = useCookies();

    useEffect(() => {
        function getUserData(){
            const userName = cookies.get("name")
            if (userName) {
                setName(userName);
            }
            const userRole = cookies.get("role")
            if (userRole) {
                setRole(userRole);
            }
        }
        getUserData()

        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            const token = cookies.get("authToken")

            if (!token) {
                setError("Authentication token not found");
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/user", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status != 200) {
                    const errorData = response.data;
                    throw new Error(errorData.message || "Failed to fetch user data");
                }

                const data: User = response.data;
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

        fetchUser();
    }, []);

    return { user, name, role, loading, error };
}
