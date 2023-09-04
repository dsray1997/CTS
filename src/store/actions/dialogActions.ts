import { dialog } from "../constants/types";

export const dialogControl = (
  title: string,
  type: string,
  data: any,
  open: boolean,
  fullScreen: boolean
) => {
  return {
    type: dialog.DIALOG_CONTROL,
    payload: { title, type, data, open, fullScreen },
  };
};
