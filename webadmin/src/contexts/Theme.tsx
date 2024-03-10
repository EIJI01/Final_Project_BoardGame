import { useReducer } from "react";
import { createContext } from "react";
import { reducer } from "../hooks/reducer/theme.reducer";

type Props = {
  children: React.ReactNode;
};

export interface InitialStateTheme {
  drawerWidth: number;
  themeColor: string;
  openRightDrawer: boolean;
}

const initialState: InitialStateTheme = {
  drawerWidth: 450,
  themeColor: "#8bc34a",
  openRightDrawer: false,
};

export const ThemeContext = createContext<{
  state: InitialStateTheme;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default function Theme({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}
