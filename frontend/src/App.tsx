import { Outlet } from "react-router-dom";
import LayoutPage from "./components/Layouts/LayoutPage";
import { useStateDispatchContext } from "./hooks/useStateDispatchHook";
import "./App.css";
import { useEffect } from "react";
export default function App() {
  const { currentMode } = useStateDispatchContext();
  useEffect(() => {
    if (currentMode.modes === "Dark") {
      document.documentElement.style.setProperty("--body-color", "#263238");
    } else {
      document.documentElement.style.setProperty("--body-color", "#ffff");
    }
  }, [currentMode]);
  return (
    <div className={`${currentMode.modes === "Dark" && "dark"} scroll`}>
      <LayoutPage>
        <Outlet />
      </LayoutPage>
    </div>
  );
}
