import React, { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { Admin } from "../models/model";
import { getUserById } from "../data/services/user";
import { Role } from "../models/value-type/enum-type";

type Props = {
  children: React.ReactNode;
};

interface AdminType {
  admin: Admin;
  setAdmin: (value: Admin) => void;
}

const initialUser = {
  id: "",
  username: "",
  email: "",
  image: "",
  role: "" as Role,
};

export const AdminContext = createContext<AdminType>({
  admin: initialUser,
  setAdmin: () => null,
});

export default function User({ children }: Props) {
  const [admin, setAdmin] = useState<Admin>(initialUser);
  console.log(admin);

  const fetchData = useCallback(async () => {
    try {
      const result = await getUserById();
      setAdmin(result);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return <AdminContext.Provider value={{ admin, setAdmin }}>{children}</AdminContext.Provider>;
}
