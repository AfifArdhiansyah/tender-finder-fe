'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUnreadMessage } from "@/hooks/useMessage";
import { useCookies } from "next-client-cookies";

interface UnreadContextType {
    unreadCount : number | undefined, 
    loading: boolean;
    error: string | null;
    resetCount: () => void;
    diffCount: () => void;
    getUnreadMessage: () => Promise<void>;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export const UnreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cookies = useCookies()
    const token = cookies.get('authToken')
    const {unreadCount, loading, error, getUnreadMessage, setUnreadCount} = useUnreadMessage()
    const [unread, setUnread] = useState<UnreadContextType>({
        unreadCount,
        loading,
        error,
        diffCount: () => {
            if (unreadCount !== undefined && unreadCount > 0) {
                setUnreadCount(unreadCount - 1);
                setUnread({
                    unreadCount: unreadCount - 1,
                    loading: false,
                    error: null,
                    resetCount: unread.resetCount,
                    diffCount: unread.diffCount,
                    getUnreadMessage: unread.getUnreadMessage,
                });
            }
        },
        resetCount: (): void => setUnread({
            unreadCount: 0,
            loading: false,
            error: null,
            resetCount: unread.resetCount,
            diffCount: unread.diffCount,
            getUnreadMessage: unread.getUnreadMessage,
        }),
        getUnreadMessage,
    });

    useEffect(() => {
        if (token) {
            getUnreadMessage();
        }
    }, [token])

    useEffect(() => {
        setUnread({ unreadCount, loading, error, resetCount: unread.resetCount, diffCount: unread.diffCount, getUnreadMessage });
    }, [unreadCount, loading, error, token]);

    return (
        <UnreadContext.Provider value={unread}>
            {children}
        </UnreadContext.Provider>
    );
};

export const useUnreadContext = () => {
  const context = useContext(UnreadContext);
  if (context === undefined) {
    throw new Error("useUnreadContext must be used within a UnreadProvide");
  }
  return context;
};