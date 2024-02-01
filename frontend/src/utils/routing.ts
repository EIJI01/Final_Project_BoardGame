import { UseUserContext } from "../contexts/ContextProvider";
import { navListMenuItemsGm, navListMenuItemsMember } from "../data/nav-data";
import { Role } from "../models/value-type/enum-type";

export const checkNavUser = () => {
  const { currentUser } = UseUserContext();
  const isEmployeeGm = !!currentUser && currentUser.role === Role.GM;
  if (isEmployeeGm) return navListMenuItemsGm;
  return navListMenuItemsMember;
};

export const protectedRoute = (data: Array<any>): Array<string> => {
  const path: Array<string> = [];
  data.forEach((data) => {
    if (data.path) path.push(data.path);
  });
  return path;
};

export const checkUser = (role: Role) => {
  if (role === Role.GM) {
    return "/gm/profile";
  } else if (role === Role.MEMBER) {
    return "/member/profile";
  } else {
    return "/notfound";
  }
};
export const checkTypeUser = (role: Role) => {
  if (role === Role.GM) {
    return true;
  } else {
    return false;
  }
};
