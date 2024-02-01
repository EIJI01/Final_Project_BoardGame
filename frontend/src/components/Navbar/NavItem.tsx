import React from "react";
import { MenuItem, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { NavLink } from "react-router-dom";
import { checkNavUser } from "../../utils/routing";

export function NavItem() {
  const { currentColor, currentMode } = useStateDispatchContext();
  document.documentElement.style.setProperty("--main-color", currentColor);
  const navdata = checkNavUser();
  return navdata.map(({ icon, title, description, path }, key) => (
    <NavLink to={path ?? "#"} key={key}>
      <MenuItem placeholder="" className={`flex items-center gap-3 rounded-lg`} id="my-element">
        <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-2">
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 text-gray-900 w-6",
          })}
        </div>
        <div>
          <Typography
            placeholder=""
            variant="h6"
            className={`flex items-center text-sm font-bold ${
              currentMode.modes === "Dark" && "text-main-dark-text"
            }`}
          >
            {title}
          </Typography>
          <Typography
            placeholder=""
            variant="paragraph"
            className={`text-xs !font-medium ${
              currentMode.modes === "Dark" && "text-secondary-dark-text"
            }`}
          >
            {description}
          </Typography>
        </div>
      </MenuItem>
    </NavLink>
  ));
}
