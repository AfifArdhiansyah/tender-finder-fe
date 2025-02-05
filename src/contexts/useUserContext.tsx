'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUser, UserModel } from "@/hooks/useUser";
import { useCookies } from "next-client-cookies";

interface UserContextType {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
  resetUser: () => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cookies = useCookies()
  const token = cookies.get('authToken')
  const { user, loading, error, fetchUser } = useUser();
  const [userData, setUserData] = useState<UserContextType>({
    user,
    loading,
    error,
    resetUser: () => setUserData({ user: null, loading: false, error: null, resetUser: userData.resetUser, fetchUser: userData.fetchUser }),
    fetchUser: fetchUser
  });

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token])

  useEffect(() => {
    setUserData({ user, loading, error, resetUser: userData.resetUser, fetchUser: userData.fetchUser });
  }, [user, loading, error, token]);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};