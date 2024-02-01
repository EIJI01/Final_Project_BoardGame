import { List, ListItem, Typography } from "@material-tailwind/react";
import { NavListMenu } from "./NavListMenu";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../contexts/ContextProvider";
import { checkUser } from "../../utils/routing";

export const NavList = memo((): JSX.Element => {
  const { currentLanguage, screenSize, setIsSettings, setOpenNav, currentColor } =
    useStateDispatchContext();
  const { currentUser } = UseUserContext();
  const navigate = useNavigate();
  document.documentElement.style.setProperty("--nav-mid", currentColor);
  return (
    <List placeholder="" className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        placeholder=""
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className={`font-medium`}
        onClick={() => {
          setOpenNav(false);
          navigate("/");
        }}
      >
        <ListItem
          id="my-element"
          placeholder=""
          className="flex items-center gap-2 py-2 pr-4 dark:text-main-dark-text dark:hover:text-main-text"
        >
          {currentLanguage.languages === "Thai" ? "หน้าหลัก" : "Home"}
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        placeholder=""
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
        onClick={() => {
          setOpenNav(false);
        }}
      >
        <ListItem
          placeholder=""
          id="my-element"
          className="flex items-center gap-2 py-2 pr-4 dark:text-main-dark-text dark:hover:text-main-text"
        >
          {currentLanguage.languages === "Thai" ? "ติดต่อเรา" : "About us"}
        </ListItem>
      </Typography>
      {screenSize <= 960 && (
        <>
          {currentUser && !checkUser(currentUser.role) && (
            <Typography
              placeholder=""
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium "
              onClick={() => {
                setOpenNav(false);
                window.location.href = "/member/profile";
              }}
            >
              <ListItem
                placeholder=""
                className="flex items-center gap-2 py-2 pr-4 dark:text-main-dark-text dark:hover:text-main-text"
              >
                {currentLanguage.languages === "Thai" ? "โปรไฟล์" : "Profile"}
              </ListItem>
            </Typography>
          )}

          <Typography
            placeholder=""
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-medium "
            onClick={() => {
              setIsSettings(true);
              setOpenNav(false);
            }}
          >
            <ListItem
              placeholder=""
              className="flex items-center gap-2 py-2 pr-4 dark:text-main-dark-text dark:hover:text-main-text"
            >
              {currentLanguage.languages === "Thai" ? "ตั่งค่า" : "Setting"}
            </ListItem>
          </Typography>
        </>
      )}
    </List>
  );
});
