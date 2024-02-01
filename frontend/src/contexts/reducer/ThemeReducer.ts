import { REDUCER_ACTION_TYPE } from "../../models/value-type/enum-type";
import { InitailStateType } from "../ThemeContext";

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string | boolean | "Dark" | "Light" | "Thai" | "English" | Number;
};

export const reducer = (state: InitailStateType, action: ReducerAction): InitailStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_CURRENT_MODE:
      return {
        ...state,
        currentMode: { modes: action.payload === "Dark" ? "Dark" : "Light" },
      };
    case REDUCER_ACTION_TYPE.SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: { languages: action.payload === "English" ? "English" : "Thai" },
      };
    case REDUCER_ACTION_TYPE.SET_ISOPEN_SETTING:
      return { ...state, isOpenThemeSettings: !!action.payload };
    case REDUCER_ACTION_TYPE.SET_CURRENT_COLOR:
      return { ...state, currentColor: action.payload as string };
    case REDUCER_ACTION_TYPE.SET_SCREEN_SIZE:
      return { ...state, screenSize: action.payload as number };
    case REDUCER_ACTION_TYPE.SET_SHOW_NAVBAR:
      return { ...state, openNav: action.payload as boolean };
    default:
      return state;
  }
};
