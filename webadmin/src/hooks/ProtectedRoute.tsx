import { useEffect, useState } from "react";
import { useAdminContext } from "./use.context";
import { Role } from "../models/value-type/enum-type";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin } = useAdminContext();
  const [pass, setPass] = useState<boolean>(true);
  const navigate = useNavigate();

  console.log(admin);

  useEffect(() => {
    if (admin && admin.role === Role.ADMIN) {
      setPass(true);
    } else {
      setPass(false);
    }
  }, [admin]);

  useEffect(() => {
    if (!pass) {
      navigate("/not-found");
    }
  }, [pass, navigate]);

  return <>{pass && children}</>;
}
