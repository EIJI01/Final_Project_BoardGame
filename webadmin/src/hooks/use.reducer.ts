import { REDUCER_ACTION_TYPE } from "./reducer/theme.reducer";
import { useThemeContext } from "./use.context";

export default function useReducerDispatch() {
  const { state, dispatch } = useThemeContext();
  const setState = {
    setTheme: (value: string) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_THEME_COLOR, payload: value });
    },
    setOpenRightDrawer: (value: boolean) => {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_OPEN_RIGHT_DRAWER, payload: value });
    },
  };

  return { state, setState };
}
