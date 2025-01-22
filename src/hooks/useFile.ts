'use client'

import api from "@/services/api"
import { useState } from "react"
import toast from "react-hot-toast"

export default function UseFile(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDownloadPenawaran = async (tenderId: string, namaPemenangTender: string) => {
        setLoading(true);
        const toastId = toast.loading("Generating PDF...");
        try {
            const response = await api.post(
                '/generate-offer-letter',
                { tender_id: tenderId },
                { responseType: 'blob' }
            );

            if (response.status != 200) {
                throw new Error('Failed to fetch PDF');
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            const fileName = ('Penawaran Kredit_' + tenderId + '_' + namaPemenangTender).replace(/[^\w\s]/gi, '');
            a.download = fileName + '.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("PDF generated successfully", { id: toastId });
        } catch (error) {
            toast.error("Failed to generate PDF", { id: toastId });
            setError('Failed to generate PDF');
            console.error('Error downloading PDF:', error);
        }
    };

    return {handleDownloadPenawaran, loading, error}
}