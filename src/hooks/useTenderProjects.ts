
import { useEffect, useState } from "react";
import api from "@/services/api";
import { TenderProjectModel } from "@/models/tender-project-model";
import toast from "react-hot-toast";
import { useCookies } from 'next-client-cookies';
import { TenderStatusModel } from "@/models/tender-status-model";

export const useTenderProjects = () => {
  const [tenderProjects, setTenderProjects] = useState<TenderProjectModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTP, setRefreshTP] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string|null>()

  useEffect(() => {
    const fetchTenderProjects = async () => {
      setLoading(true)
      try {
        let url = "/tender-projects"
        if(selectedFilter){
          url += "?status=" +selectedFilter
        }
        const response = await api.get<TenderProjectModel[]>(url);
        setTenderProjects(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderProjects();
  }, [refreshTP, selectedFilter]);

  const refresh = ()=>{
    setRefreshTP(!refreshTP)
  }

  return { tenderProjects, selectedFilter, setSelectedFilter, refresh, loading, error };
};

export const useGetTenderById = (id: string) => {
  const [tenderProject, setTenderProject] = useState<TenderProjectModel>();
  const [tenderProjectStatuses, setTenderProjectStatuses] = useState<TenderStatusModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTP, setRefreshTP] = useState(false);

  useEffect(() => {
    const fetchTenderProject = async () => {
      try {
        const response = await api.get<TenderProjectModel>("/tender-projects/id/"+id);
        setTenderProject(response.data);
        setTenderProjectStatuses(response.data.tender_statuses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderProject();
  }, [refreshTP]);

  const refresh = ()=>{
    setRefreshTP(!refreshTP)
  }

  return { tenderProject,tenderProjectStatuses, refresh, loading, error };
}

export const useGetTendersByUser = () =>{
  const [tenderProjects, setTenderProjects] = useState<TenderProjectModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cookies = useCookies();
  const token = cookies.get("authToken")
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return { tenderProjects, loading, error };
  }

  useEffect(() => {
    const fetchTenderProjects = async () => {
      try {
        const response = await api.get<TenderProjectModel[]>("/tender-projects/user", {
          headers: {
              "Authorization": `Bearer ${token}`
          },
        });
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