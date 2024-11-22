// src/hooks/useTenderProjects.ts
import { useEffect, useState } from "react";
import api from "@/services/api";
import { TenderProjectModel } from "@/models/tender-project-model";

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