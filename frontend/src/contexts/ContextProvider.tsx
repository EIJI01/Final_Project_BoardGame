import React, { useState, createContext, useContext } from "react";
import { User } from "../models/user";
import { Gm, Member } from "../data/user";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (data: User | null) => void;
};
const UserContexts = createContext<UserContextType>({
  // currentUser: null,
  currentUser: Gm,
  // currentUser: Member,
  setCurrentUser: () => null,
});

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(Gm);
  // const [currentUser, setCurrentUser] = useState<User | null>(Member);
  return (
    <UserContexts.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContexts.Provider>
  );
};

export const UseUserContext = () => useContext(UserContexts);
