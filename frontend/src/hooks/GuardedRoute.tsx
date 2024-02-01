import { useEffect, useState } from "react";
import { UseUserContext } from "../contexts/ContextProvider";
import { Role } from "../models/value-type/enum-type";
import { useLocation, useNavigate } from "react-router-dom";
import { protectedRoute } from "../utils/routing";
import {
  gmProfile,
  memberProfile,
  navListMenuItemsGm,
  navListMenuItemsMember,
} from "../data/nav-data";

export const GuardedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isNotAccessRoute, setIsNotAccessRoute] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { currentUser } = UseUserContext();
  const navigate = useNavigate();
  console.log(isNotAccessRoute);
  useEffect(() => {
    const memberIsNotAccess =
      (!currentUser || currentUser.role == Role.MEMBER) &&
      protectedRoute([...navListMenuItemsGm, gmProfile]).includes(pathname);
    const gmIsNotAccess =
      protectedRoute([...navListMenuItemsMember, memberProfile]).includes(pathname) &&
      !!currentUser &&
      currentUser.role == Role.GM;
    const nullUserNotAcess = !currentUser && protectedRoute([memberProfile]).includes(pathname);
    const checkPath = () => {
      if (memberIsNotAccess || gmIsNotAccess || nullUserNotAcess) setIsNotAccessRoute(true);
    };
    checkPath();
  }, [currentUser, pathname]);

  useEffect(() => {
    if (isNotAccessRoute) {
      navigate(-1);
    }
  }, [isNotAccessRoute, navigate]);

  return <>{children}</>;
};
