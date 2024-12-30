import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { UserMessageModel } from "@/models/message-model";
import api from "@/services/api";

export const useMessage = () =>{
    const cookies = useCookies()
    const token = cookies.get("authToken")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isRefresh, setIsRefresh] = useState(false)
    const [messages, setMessages] = useState<UserMessageModel[]>([])

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const response = await api.get("/user-messages", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setMessages(response.data.data as UserMessageModel[])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [isRefresh])

    const refresh = () => {
        setIsRefresh(!refresh)
    }

    return { messages, refresh, loading, error }
}

export const useReadMessage = () => {
    const cookies = useCookies()
    const token = cookies.get("authToken")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [response, setResponse] = useState<UserMessageModel>()

    const setReadMessage = async (userMessageId: number) =>{
        setLoading(true)
        try {
            const response = await api.put("/user-messages/read",
                JSON.stringify({ user_message_id: userMessageId }),
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            setResponse(response.data.data as UserMessageModel)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { response, loading, error, setReadMessage }
}