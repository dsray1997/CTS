// eslint-disable-next-line import/named
import { AnyAction } from "@reduxjs/toolkit";
import { list } from "../constants/types";

interface List {
  name: string | null | undefined;
  rows: any[] | null;
  columns: any[] | null;
  pageCount: number;
  selectedPage: number;
  selectedRows: any[] | null;
}
const initialState = {
  name: null,
  rows: null,
  columns: null,
  pageCount: 0,
  selectedPage: 0,
  selectedRows: null,
};

const listReducer = (state: List = initialState, action: AnyAction) => {
  switch (action.type) {
    case list.SET_LIST:
      return {
        ...state,
        name: action.payload.name,
        pageCount: action.payload.pageCount,
        selectedPage: action.payload.selectedPage,
      };
    case list.UPDATE_LIST:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export default listReducer;
