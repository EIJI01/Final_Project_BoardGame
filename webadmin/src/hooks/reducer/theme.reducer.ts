import { InitailStateTheme } from "../../contexts/Theme";

export enum REDUCER_ACTION_TYPE {
  SET_THEME_COLOR,
  SET_DRAWER_WIDTH,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

export const reducer = (state: InitailStateTheme, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_THEME_COLOR:
      return { ...state, themeColor: action.payload };
    case REDUCER_ACTION_TYPE.SET_DRAWER_WIDTH:
      return { ...state, drawerWidth: action.payload };
    default:
      return state;
  }
};
