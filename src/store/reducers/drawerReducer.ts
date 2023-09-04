// eslint-disable-next-line import/named
import { AnyAction } from "@reduxjs/toolkit";
import { drawer } from "../constants/types";

interface Drawer {
  title: string;
  type: string;
  data: any;
  open: boolean;
  isMinimized: boolean;
  isMinimizable: boolean;
  width: string;
}
const initialState = {
  title: "",
  type: "",
  data: null,
  open: false,
  isMinimized: false,
  isMinimizable: false,
  width: "0%",
};

const drawerReducer = (state: Drawer = initialState, action: AnyAction) => {
  switch (action.type) {
    case drawer.DRAWER_CONTROL:
      return {
        ...state,
        title: action.payload.title,
        type: action.payload.type,
        data: action.payload.data,
        open: action.payload.open,
        width: action.payload.width,
        isMinimizable: action.payload.isMinimizable,
      };
    case drawer.DRAWER_MINIMIZE_CONTROL:
      return {
        ...state,
        isMinimized: action.payload,
      };
    default:
      return state;
  }
};

export default drawerReducer;
