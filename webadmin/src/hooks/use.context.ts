import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { AdminContext } from "../contexts/User";

//**Use Theme Provider */
export const useThemeContext = () => useContext(ThemeContext);

//**Use Admin Provider */
export const useAdminContext = () => useContext(AdminContext);
