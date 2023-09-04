// eslint-disable-next-line import/named
import { AnyAction } from "@reduxjs/toolkit";
import { dialog } from "../constants/types";

interface Dialog {
  title: string;
  type: string;
  data: any;
  open: boolean;
  fullScreen: boolean;
}
const initialState = {
  title: "",
  type: "",
  data: null,
  open: false,
  fullScreen: false,
};

const dialogReducer = (state: Dialog = initialState, action: AnyAction) => {
  switch (action.type) {
    case dialog.DIALOG_CONTROL:
      return {
        ...state,
        title: action.payload.title,
        type: action.payload.type,
        data: action.payload.data,
        open: action.payload.open,
        fullScreen: action.payload.fullScreen,
      };
    default:
      return state;
  }
};

export default dialogReducer;
