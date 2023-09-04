import { drawer } from "../constants/types";

export const drawerControl = (
  title: string,
  type: string,
  data: any,
  open: boolean,
  isMinimizable: boolean,
  width: string
) => {
  return {
    type: drawer.DRAWER_CONTROL,
    payload: { title, type, data, open, isMinimizable, width },
  };
};
export const drawerMinimizeControl = (isMinimized: boolean) => {
  return {
    type: drawer.DRAWER_MINIMIZE_CONTROL,
    payload: isMinimized,
  };
};
