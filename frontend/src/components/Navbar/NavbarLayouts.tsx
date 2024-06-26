import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  ListItem,
  Avatar,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavList } from "./NavList";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../contexts/ContextProvider";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { memo, useCallback, useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import logo from "../../assets/logo-boardgame.png";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { checkTypeUser } from "../../utils/routing";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import { getAllBranchId } from "../../data/services/branch-service/getAllIdbranch";
import { BranchAllIdResponse } from "../../models/data/branch";

const NavbarLayouts = memo((): JSX.Element => {
  const [menuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { currentUser } = UseUserContext();
  const {
    currentLanguage,
    currentColor,
    openNav,
    setOpenNav,
    setOpenNotification,
    openNotification,
  } = useStateDispatchContext();
  const [branch, setBranch] = useState<BranchAllIdResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.clear();
  }, []);
  useEffect(() => {
    const branchId = localStorage.getItem("branchId");
    const fetchBranch = async () => {
      try {
        var result = await getAllBranchId();
        if (result) {
          const branch = result.filter((data) => data.id === branchId)[0];
          setBranch(branch);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchBranch();
    setInterval(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  return (
    <Navbar
      placeholder=""
      className="mx-auto max-w-screen-bestLarg lg:px-10 py-5 dark:bg-main-dark-bg fixed z-40 overflow-hidden dark:border-main-dark"
      fullWidth
    >
      <div className="lg:grid grid-cols-3 text-blue-gray-900 flex items-center justify-between">
        <div className="lg:ml-2 mr-4 cursor-pointer" onClick={() => (window.location.href = "/")}>
          <div className="bg-white rounded-lg w-fit ml-0">
            <img src={logo} alt="" className="w-auto h-8" />
          </div>
          <Typography
            placeholder=""
            className=" cursor-pointer lg:text-[12px] font-semibold  dark:text-main-dark-text lg-max:hidden"
          >
            BoardGame Everyday
          </Typography>
        </div>
        <div className="hidden lg:block mx-auto">
          <NavList />
        </div>

        <div className="gap-3 lg:flex items-center justify-end">
          {currentUser && !checkTypeUser(currentUser.role) && (
            <Badge placement="top-end">
              <BellAlertIcon
                className="h-7 w-7 text-gray-500 transform hover:scale-90 transition cursor-pointer"
                onClick={() => setOpenNotification(!openNotification)}
              />
            </Badge>
          )}
          {!!!isLoading ? (
            <div className="hidden gap-2 lg:flex">
              {currentUser ? (
                <Menu offset={{ mainAxis: 20 }}>
                  <MenuHandler>
                    <Typography placeholder="" as="div" variant="small" className="font-medium">
                      <ListItem
                        placeholder=""
                        className="flex items-center gap-2 py-1 pr-4 font-medium text-main-text"
                        selected={false}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        style={{ backgroundColor: currentColor }}
                      >
                        <Avatar
                          placeholder=""
                          size="sm"
                          alt="avatar"
                          src={currentUser.image}
                          className="  "
                          style={{ border: `2px solid white` }}
                        />

                        <Typography
                          placeholder={``}
                          className={`${
                            currentColor ? "text-main-dark-text text-sm" : "text-main-bure-text"
                          } dark:text-main-dark-text text-sm`}
                        >
                          {currentLanguage.languages === "Thai" ? (
                            <span className="text-md font-semibold">สวัสดี</span>
                          ) : (
                            <span className="text-md font-semibold">Hi,</span>
                          )}{" "}
                          {currentUser.name}
                        </Typography>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`hidden h-3 w-3 transition-transform lg:block ${
                            currentColor ? "text-main-dark-text text-sm" : "text-main-bure-text"
                          } dark:text-main-dark-text ${menuOpen ? "rotate-180" : ""}`}
                        />
                      </ListItem>
                    </Typography>
                  </MenuHandler>
                  <MenuList placeholder={""}>
                    {checkTypeUser(currentUser?.role) ? (
                      <MenuItem placeholder={""} className="border-b-1">
                        <div className="flex flex-col justify-around items-center p-1">
                          <img src={currentUser.image} alt="profile" className="w-14 h-14" />
                          <div>GM, {currentUser.name}</div>
                        </div>
                        <div className="text-center mx-auto">
                          <span>Branch: </span>
                          <span>{branch?.branchName}</span>
                        </div>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        placeholder={""}
                        className="border-b-1"
                        onClick={() => navigate("/member/profile")}
                      >
                        <div className="flex justify-around items-center p-1">
                          <UserCircleIcon className="w-5 h-5" />
                          Profile
                        </div>
                      </MenuItem>
                    )}
                    <MenuItem
                      placeholder={""}
                      onClick={() => {
                        handleLogout();
                        window.location.href = "/login";
                      }}
                    >
                      <div className="flex justify-around items-center p-1">
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        Log out
                      </div>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <ButtonCustom
                    variant="outlined"
                    size="sm"
                    onClick={() => (window.location.href = "/login")}
                    className="dark:text-main-dark-text"
                  >
                    {currentLanguage.languages === "Thai" ? "เข้าสู่ระบบ" : "Sign In"}
                  </ButtonCustom>

                  <ButtonCustom
                    variant="gradient"
                    color={currentColor}
                    className="text-main-dark-text"
                    size="sm"
                    onClick={() => (window.location.href = "/register")}
                  >
                    {currentLanguage.languages === "Thai" ? "ลงทะเบียน" : "Sign Up"}
                  </ButtonCustom>
                </>
              )}
            </div>
          ) : (
            <div className="lg:flex hidden">
              <div className="flex animate-pulse flex-wrap items-center gap-8">
                <div className="grid h-10 w-40 place-items-center rounded-lg bg-gray-100"></div>
              </div>
            </div>
          )}
        </div>

        <IconButton
          placeholder=""
          variant="text"
          color="blue-gray"
          className="lg:hidden dark:text-main-dark-text"
          onClick={() => setOpenNav(!openNav)}
          style={{ color: currentColor }}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />
        {currentUser ? (
          <ButtonCustom
            variant="outlined"
            size="sm"
            fullWidth
            onClick={() => {
              handleLogout();
              window.location.href = "/login";
            }}
            className="dark:text-main-dark-text"
          >
            Log Out
          </ButtonCustom>
        ) : (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <ButtonCustom
              variant="outlined"
              size="sm"
              fullWidth
              onClick={() => navigate("/login")}
              className="dark:text-main-dark-text"
            >
              Sign In
            </ButtonCustom>

            <ButtonCustom
              variant="gradient"
              size="sm"
              color={currentColor}
              fullWidth
              onClick={() => navigate("/register")}
            >
              Sign Up
            </ButtonCustom>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
});

export default NavbarLayouts;
