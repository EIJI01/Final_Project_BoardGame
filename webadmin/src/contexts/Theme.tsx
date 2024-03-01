import { useReducer } from "react";
import { createContext } from "react";
import { reducer } from "../hooks/reducer/theme.reducer";

type Props = {
  children: React.ReactNode;
};

export interface InitailStateTheme {
  themeColor: string;
}

const initailState: InitailStateTheme = {
  themeColor: "",
};

export const ThemeContext = createContext<{
  state: InitailStateTheme;
  dispatch: React.Dispatch<any>;
}>({ state: initailState, dispatch: () => null });

export default function Theme({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    themeColor: "#8bc34a",
  });

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}
