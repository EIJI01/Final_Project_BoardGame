import { useCallback } from "react";
import { UseThemeContext } from "../contexts/ThemeContext";
import { REDUCER_ACTION_TYPE } from "../models/value-type/enum-type";

export const useStateDispatchContext = () => {
  const { state, dispatch } = UseThemeContext();
  const setModes = useCallback(
    (mode: "Light" | "Dark") => {
      if (state.currentMode.modes === mode) return null;
      dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_MODE, payload: mode });
      dispatch({ type: REDUCER_ACTION_TYPE.SET_ISOPEN_SETTING, payload: false });
    },
    [state.currentMode]
  );
  const setColors = useCallback(
    (color: string) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_COLOR, payload: color });
      dispatch({ type: REDUCER_ACTION_TYPE.SET_ISOPEN_SETTING, payload: false });
    },
    [state.currentColor]
  );
  const setLanguages = useCallback(
    (lang: "English" | "Thai") => {
      if (state.currentLanguage.languages === lang) return null;
      dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_LANGUAGE, payload: lang });
      dispatch({ type: REDUCER_ACTION_TYPE.SET_ISOPEN_SETTING, payload: false });
    },
    [state.currentLanguage]
  );
  const setIsSettings = useCallback(
    (setting: boolean) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_ISOPEN_SETTING, payload: setting });
    },
    [state.isOpenThemeSettings]
  );
  const setScreenSize = useCallback(
    (size: number) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_SCREEN_SIZE, payload: size });
    },
    [state.screenSize]
  );
  const setOpenNav = useCallback(
    (isOpen: boolean) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_SHOW_NAVBAR, payload: isOpen });
    },
    [state.openNav]
  );
  return { setModes, setColors, setLanguages, setOpenNav, setIsSettings, setScreenSize, ...state };
};
