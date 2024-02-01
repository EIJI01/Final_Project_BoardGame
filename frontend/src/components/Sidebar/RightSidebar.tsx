import { Button, Drawer, Tooltip } from "@material-tailwind/react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { themeColors } from "../../data/theme-color";
import { BsCheck } from "react-icons/bs";
import { memo } from "react";

const RightSidebar = memo(() => {
  const {
    setIsSettings,
    currentMode,
    currentColor,
    setColors,
    setModes,
    setLanguages,
    isOpenThemeSettings,
  } = useStateDispatchContext();
  return (
    <Drawer
      placeholder=""
      open={isOpenThemeSettings}
      onClose={() => setIsSettings(false)}
      placement="right"
      size={320}
      className="dark:bg-main-bure-text"
    >
      <div className="flex justify-between items-center p-4 ml-4">
        <p className="font-semibold text-xl dark:text-main-dark-text">Settings</p>
        <button
          type="button"
          onClick={() => setIsSettings(false)}
          style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-gray-200 hover:dark:bg-gray-700"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex-col border-t-1 border-color p-4 ml-4">
        <p className="font-semibold text-lg dark:text-main-dark-text">Theme Options</p>
        <div className="mt-4">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            className="cursor-pointer"
            onChange={(e) => {
              setModes(e.target.value as "Light" | "Dark");
              sessionStorage.setItem("modes", JSON.stringify(e.target.value));
            }}
            checked={currentMode.modes === "Light"}
          />
          <label htmlFor="light" className="ml-2 text-sm cursor-pointer dark:text-main-dark-text">
            Light
          </label>
        </div>
        <div className="mt-4">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            className="cursor-pointer"
            onChange={(e) => {
              setModes(e.target.value as "Light" | "Dark");
              sessionStorage.setItem("modes", JSON.stringify(e.target.value));
            }}
            checked={currentMode.modes === "Dark"}
          />
          <label htmlFor="dark" className="ml-2 text-sm cursor-pointer dark:text-main-dark-text">
            Dark
          </label>
        </div>
      </div>
      <div className="flex-col border-t-1 border-color p-4 ml-4">
        <p className="font-semibold text-lg dark:text-main-dark-text">Theme Colors</p>
        <div className={`flex gap-1 flex-wrap`}>
          {themeColors.map((item, index) => (
            <Tooltip key={index} content={item.name} placement="bottom">
              <div className="relative mt-2 cursor-pointer flex items-center">
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => {
                    setColors(item.color);
                    sessionStorage.setItem("currentColor", JSON.stringify(item.color));
                  }}
                >
                  <BsCheck
                    className={`ml-2 text-2xl text-white ${
                      item.color === currentColor ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="flex-col border-t-1 border-color p-4 ml-4">
        <p className="font-semibold text-lg dark:text-main-dark-text">Language Options</p>
        <div className="mt-4 flex gap-3">
          <Button
            placeholder={""}
            type="button"
            fullWidth
            variant="outlined"
            className="dark:text-main-dark-text dark:border-gray-400"
            onClick={() => {
              setLanguages("Thai");
              sessionStorage.setItem("languages", JSON.stringify("Thai"));
            }}
          >
            Thai
          </Button>
          <Button
            placeholder={""}
            type="button"
            fullWidth
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setLanguages("English");
              sessionStorage.setItem("languages", JSON.stringify("English"));
            }}
          >
            English
          </Button>
        </div>
      </div>
    </Drawer>
  );
});

export default RightSidebar;
