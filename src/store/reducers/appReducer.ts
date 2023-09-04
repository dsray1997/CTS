// eslint-disable-next-line import/named
import { AnyAction } from "@reduxjs/toolkit";
import { app } from "../constants/types";

interface App {
  me: object;
  modules: object[];
  components: any[];
  selecteModule: string;
  sidebarIsMinimized: boolean;
}
const initialState = {
  me: {},
  modules: [],
  components: [],
  selecteModule: "",
  sidebarIsMinimized: true,
};

const dialogReducer = (state: App = initialState, action: AnyAction) => {
  switch (action.type) {
    case app.SET_APP:
      return {
        ...state,
        me: action.payload.me,
        modules: action.payload.modules,
        selecteModule: action.payload.selecteModule,
      };
    case app.UPDATE_APP:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case app.MAX_MIN_SIDEBAR:
      return {
        ...state,
        sidebarIsMinimized: action.payload,
      };
    case app.SET_INSTITUTE_LINK:
      return {
        ...state,
        listInstitute: action.payload,
      };
    default:
      return state;
  }
};

export default dialogReducer;
