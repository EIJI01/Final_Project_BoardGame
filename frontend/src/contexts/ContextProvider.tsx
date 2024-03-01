import React, { useState, createContext, useContext, useEffect, useCallback } from "react";
import { User } from "../models/data/user";
import { getUserById } from "../data/services/user-service/user";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (data: User | null) => void;
};

const UserContexts = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const fetchData = useCallback(async () => {
    try {
      const result = await getUserById();
      setCurrentUser(result);
      console.log(result);
    } catch (err: any) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContexts.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContexts.Provider>
  );
};

export const UseUserContext = () => useContext(UserContexts);
