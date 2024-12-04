import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import api from "@/services/api";

export const useUploadData = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState()
    const cookies = useCookies();
  
    const uploadDataPenawaranAO = async (formData: FormData) => {
      setLoading(true);
      setError(null);
      const toastId = toast.loading("Upload data penawaran...");
      try {
        const response = await api.post("/tender-statuses/upload-data-penawaran", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
  
        if (response.status != 200) {
            const errorData = await response.data;
            throw new Error(errorData.message || "Gagal update status");
        }
  
        const data = await response.data;
        setSuccess(data);
        toast.success("Success upload data penawaran!", { id: toastId });
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

    const uploadDataFollowUpAO = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        const toastId = toast.loading("Upload data follow up...");
        try {
            const response = await api.post("/tender-statuses/upload-data-follow-up", formData, {
                headers: { "Content-Type": "multipart/form-data" },
        })

        if (response.status != 200) {
            const errorData = await response.data;
            throw new Error(errorData.message || "Gagal update status");
        }

        const data = await response.data;
        setSuccess(data);
        toast.success("Success upload data follow up!", { id: toastId });
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
    return { uploadDataPenawaranAO, uploadDataFollowUpAO, loading, error }
}