// src/hooks/useTenderProjects.ts
import { useEffect, useState } from "react";
import api from "@/services/api";
import { TenderProjectModel } from "@/models/tender-project-model";
import toast from "react-hot-toast";
import { useCookies } from 'next-client-cookies';

export const useTenderProjects = () => {
  const [tenderProjects, setTenderProjects] = useState<TenderProjectModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenderProjects = async () => {
      try {
        const response = await api.get<TenderProjectModel[]>("/tender-projects");
        setTenderProjects(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderProjects();
  }, []);

  return { tenderProjects, loading, error };
};

export const useGetTenderById = (id: string) => {
  const [tenderProject, setTenderProject] = useState<TenderProjectModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenderProject = async () => {
      try {
        const response = await api.get<TenderProjectModel>("/tender-projects/"+id);
        setTenderProject(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderProject();
  }, []);

  return { tenderProject, loading, error };
}

export const useAssignAO = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataTender, setDataTender] = useState<TenderProjectModel>()
  const cookies = useCookies();

  const assignAOToTender = async (tender_id: string, ao_id: number) => {
    setLoading(true);
    setError(null);
    const toastId = toast.loading("Assign to AO...");
    try {
      const token = cookies.get("authToken")
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
      }
      const response = await api.post("/tender-projects/assign-to-ao", JSON.stringify({ tender_id, ao_id }), {
          headers: {
              "Authorization": `Bearer ${token}`
          },
      })

      if (response.status != 200) {
          const errorData = await response.data;
          throw new Error(errorData.message || "Assign to AO failed");
      }

      const data: TenderProjectModel = await response.data.data;
      setDataTender(data);
      toast.success("Assign to AO successful!", { id: toastId });
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

  return { assignAOToTender, loading, error };
}