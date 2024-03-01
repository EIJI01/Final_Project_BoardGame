import React, { useState } from "react";
import { createContext } from "react";
import { Admin } from "../models/model";
import { admins } from "../data/admin";

type Props = {
  children: React.ReactNode;
};

interface AdminType {
  admin: typeof admins;
  setAdmin: (value: Admin) => void;
}

export const AdminContext = createContext<AdminType>({
  admin: {
    username: "",
    email: "",
    image: "",
  },
  setAdmin: () => null,
});

export default function User({ children }: Props) {
  const [admin, setAdmin] = useState<Admin>(admins);

  return <AdminContext.Provider value={{ admin, setAdmin }}>{children}</AdminContext.Provider>;
}
