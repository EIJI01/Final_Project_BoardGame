import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { memo } from "react";
import { NavItem } from "./NavItem";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

export const NavListMenu = memo((): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { currentLanguage, setOpenNav } = useStateDispatchContext();
  const { currentColor, currentMode } = useStateDispatchContext();
  document.documentElement.style.setProperty("--service", currentColor);
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography placeholder="" as="div" variant="small" className="font-medium">
            <ListItem
              id="service"
              placeholder=""
              className="flex items-center gap-2 py-2 pr-4 font-medium dark:bg-main-dark-bg"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {currentLanguage.languages === "Thai" ? "บริการ" : "Service"}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder=""
          className={`hidden max-w-screen-xl rounded-xl lg:block ${
            currentMode.modes === "Dark" ? "bg-main-dark-bg border-gray-700" : ""
          }`}
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            <NavItem />
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <div onClick={() => setOpenNav(false)}>
            <NavItem />
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
});
