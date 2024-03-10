import { InitialStateTheme } from "../../contexts/Theme";

export enum REDUCER_ACTION_TYPE {
  SET_THEME_COLOR,
  SET_DRAWER_WIDTH,
  SET_OPEN_RIGHT_DRAWER,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

export const reducer = (state: InitialStateTheme, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_THEME_COLOR:
      return { ...state, themeColor: action.payload as string };
    case REDUCER_ACTION_TYPE.SET_DRAWER_WIDTH:
      return { ...state, drawerWidth: action.payload as number };
    case REDUCER_ACTION_TYPE.SET_OPEN_RIGHT_DRAWER:
      return { ...state, openRightDrawer: action.payload as boolean };
    default:
      return state;
  }
};
