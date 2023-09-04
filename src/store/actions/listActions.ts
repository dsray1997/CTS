import { list } from "../constants/types";

export const setList = (
  name: string | undefined,
  pageCount: number,
  selectedPage: number
) => {
  return {
    type: list.SET_LIST,
    payload: { name, pageCount, selectedPage },
  };
};
export const updateList = (key: string, data: any) => {
  return {
    type: list.UPDATE_LIST,
    payload: { key, data },
  };
};
