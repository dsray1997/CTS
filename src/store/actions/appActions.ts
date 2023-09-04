import { app } from "../constants/types";

export const setApp = (
  me: object,
  modules: object[],
  selecteModule: string
) => {
  return {
    type: app.SET_APP,
    payload: { me, modules, selecteModule },
  };
};
export const updateApp = (key: string, data: any) => {
  return {
    type: app.UPDATE_APP,
    payload: { key, data },
  };
};
export const trogleSidebar = (state: boolean) => {
  return {
    type: app.MAX_MIN_SIDEBAR,
    payload: state,
  };
};
export const setInstituteList = (instituteList: object[]) => {
  return {
    type: app.SET_INSTITUTE_LINK,
    payload: instituteList,
  };
};
