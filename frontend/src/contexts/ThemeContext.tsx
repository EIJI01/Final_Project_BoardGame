import React, { useContext, createContext, useReducer } from "react";
import { reducer } from "./reducer/ThemeReducer";
import { getSessionStorageItem } from "../utils/getSesstion";

interface ModeType {
  modes: "Light" | "Dark";
}
interface LanguageType {
  languages: "English" | "Thai";
}
export interface InitailStateType {
  currentMode: ModeType;
  currentColor: string;
  isOpenThemeSettings: boolean;
  currentLanguage: LanguageType;
  screenSize: number;
  openNav: boolean;
}
function initialStateInSession() {
  const colors = getSessionStorageItem<string>("currentColor");
  const modes = getSessionStorageItem<"Light" | "Dark">("modes");
  const languages = getSessionStorageItem<"English" | "Thai">("languages");
  const color = !!colors ? colors : "#8bc34a";
  const mode = !!modes ? modes : "Light";
  const language = !!languages ? languages : "English";
  return { color, mode, language };
}
const { color, mode, language } = initialStateInSession();
const initailState: InitailStateType = {
  currentColor: color,
  currentLanguage: { languages: language },
  currentMode: { modes: mode },
  isOpenThemeSettings: false,
  screenSize: window.innerWidth,
  openNav: false,
};
const ThemeContext = createContext<{ state: InitailStateType; dispatch: React.Dispatch<any> }>({
  state: initailState,
  dispatch: () => null,
});

export default function ThemeContextProviders({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initailState);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}

export const UseThemeContext = () => useContext(ThemeContext);
