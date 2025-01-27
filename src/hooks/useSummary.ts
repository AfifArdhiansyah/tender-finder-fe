import { useState, useEffect } from "react";
import api from "@/services/api";
import { SummaryCabangModel, SummaryKanwilModel, SummaryModel, SummaryPusatModel } from "@/models/summary-model";
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

        fetchTenderProjects();
    }, [refreshTP, officeId, setOfficeId]);

    const refresh = ()=>{
        setRefreshTP(!refreshTP)
    }

    return { summary, setOfficeId, loading, error, refresh };
}

export const useTableSummary = () => {
    const [tablePusatSummary, setTablePusatSummary] = useState<SummaryPusatModel[]>([]);
    const [tableKanwilSummary, setTableKanwilSummary] = useState<SummaryKanwilModel[]>([]);
    const [tableCabangSummary, setTableCabangSummary] = useState<SummaryCabangModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchSummaryPusat(){
        try {
            const response = await api.get("/monitor/dashboard-summary");
            setTablePusatSummary(response.data.data as SummaryPusatModel[]);
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

    async function fetchSummaryKanwil(idKanwil: number){
        try {
            const response = await api.get("/monitor/dashboard-summary/"+idKanwil);
            setTableKanwilSummary(response.data.data as SummaryKanwilModel[]);
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

    async function fetchSummaryCabang(idBranch: number){
        try {
            const response = await api.get("/monitor/dashboard-summary/"+idBranch+'/ao');
            setTableCabangSummary(response.data.data as SummaryCabangModel[]);
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

    return { 
        fetchSummaryPusat,
        fetchSummaryKanwil,
        fetchSummaryCabang,
        tablePusatSummary, 
        tableKanwilSummary, 
        tableCabangSummary, 
        loading, 
        error 
    };
}