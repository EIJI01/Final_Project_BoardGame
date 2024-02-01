import { Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { UseUserContext } from "../../contexts/ContextProvider";
import { checkTypeUser } from "../../utils/routing";

export default function FooterWithLogo() {
  const { currentColor } = useStateDispatchContext();
  const { currentUser } = UseUserContext();
  document.documentElement.style.setProperty("--hover-footer", currentColor);
  return (
    <footer className="w-full bg-white py-8 dark:bg-main-bure-text">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  lg:p-4 rounded-lg w-full text-center md:justify-between py-2">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="logo-ct"
          className="lg:w-10 w-6"
        />
        <ul className="flex flex-wrap items-center gap-y-2 lg:gap-x-8 gap-x-4">
          <li>
            <Typography
              placeholder={""}
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors footer dark:text-main-dark-text lg:text-base text-xs"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              placeholder={""}
              as="a"
              href={checkTypeUser(currentUser?.role) ? "/gm/manage-cards" : "/member/booking-queue"}
              color="blue-gray"
              className="font-normal transition-colors footer dark:text-main-dark-text text-xs lg:text-base"
            >
              {checkTypeUser(currentUser?.role) ? "Manage Crads" : "Reservation Queue"}
            </Typography>
          </li>
          <li>
            <Typography
              placeholder={""}
              as="a"
              href={checkTypeUser(currentUser?.role) ? "/gm/manage-queue" : "/member/calling-gm"}
              color="blue-gray"
              className="font-normal transition-colors footer dark:text-main-dark-text text-xs lg:text-base"
            >
              {checkTypeUser(currentUser?.role) ? "Manage Queue" : "Calling GM"}
            </Typography>
          </li>
          <li className={checkTypeUser(currentUser?.role) ? "" : "hidden"}>
            <Typography
              placeholder={""}
              as="a"
              href="/gm/manage-table"
              color="blue-gray"
              className="font-normal transition-colors footer dark:text-main-dark-text text-xs lg:text-base"
            >
              {checkTypeUser(currentUser?.role) ? "Manage Table" : ""}c
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography placeholder={""} className="text-center font-normal dark:text-main-dark-text">
        &copy; 2023 Boardgame Everyday
      </Typography>
    </footer>
  );
}
