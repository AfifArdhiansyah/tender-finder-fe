import { useState, useEffect } from "react";
import api from "@/services/api";
import { SummaryModel } from "@/models/summary-model";
import { useCookies } from 'next-client-cookies';

export const useSummary = () => {
    const [summary, setSummary] = useState<SummaryModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTP, setRefreshTP] = useState(false);

    const cookies = useCookies();
    const [officeId, setOfficeId] = useState(cookies.get("office-id") || "0")

    useEffect(() => {
        const fetchTenderProjects = async () => {
            setLoading(true)
            try {
                const response = await api.get("/monitor/summary/"+officeId);
                setSummary(response.data.data as SummaryModel);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTenderProjects();
    }, [refreshTP, officeId, setOfficeId]);

    const refresh = ()=>{
        setRefreshTP(!refreshTP)
    }

    return { summary, setOfficeId, loading, error, refresh };
}