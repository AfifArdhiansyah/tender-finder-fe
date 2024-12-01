import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/services/api";

interface LoginResponse {
    success: boolean,
    data: {
        token: string,
        nama: string,
        role: string
    },
    message: string
}

interface UseAuthReturn {
    login: (nip: string, password: string) => Promise<void>;
    error: string | null;
    loading: boolean;
}

export function useAuth(): UseAuthReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (nip: string, password: string) => {
        setLoading(true);
        setError(null);
        const toastId = toast.loading("Logging in...");
        try {            
            const response = await api.post("/login", JSON.stringify({ nip, password }))

            if (response.status != 200) {
                const errorData = await response.data;
                throw new Error(errorData.message || "Login failed");
            }

            const data: LoginResponse = await response.data;

            // Simpan token di localStorage atau cookies
            localStorage.setItem("authToken", data.data.token);
            localStorage.setItem("name", data.data.nama)
            localStorage.setItem("role", data.data.role)
            toast.success("Login successful!", { id: toastId });

            // Redirect ke Dashboard
            router.push("/dashboard");
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

    return { login, error, loading };
}
