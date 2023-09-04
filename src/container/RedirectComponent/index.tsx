import React from "react";
import { Dispatch } from "react";
import Login from "@/components/login";
import AppContainer from "../AppContainer";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { userMenu } from "../../appConfig";
import { useDispatch, useSelector } from "react-redux";
import { groupByObjectArrayByProperty } from "@/utils";
import { setApp } from "@/store/actions/appActions";
import * as httpClient from "@/services/httpClient";
import * as api from "@/services/api";
import decodeJwt from "@/services/decoder";
``
interface dispatchFunction {
  type: string;
  payload: any;
}
const RedirectComponent: React.FC = () => {
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  
  React.useEffect(() => {
  // const accessToken = localStorage.getItem("access_token");
  // if(accessToken != null && app.modules.length==0){
  //   getMenu(accessToken)
  // }
  if(app.modules.length==0){
  let _me = app.me;
  dispatch(setApp(_me, userMenu, userMenu[0].name));
  }
},[app.modules]);
  
  // const getMenu=(accessToken:string)=>{
  //   let _me = app.me;
  //   dispatch(setApp(_me, userMenu, userMenu[0].name));
  // }
  const params = useParams();
  let _keyCount = Object.keys(params).length;
  if (_keyCount == 0 ){
    return <AppContainer />;
  }else if( params.name == "login") {
    return <Login />;
  } 
  else if (params.name == "404") {
    return <div />;
  } else {
    return <AppContainer />;
  }
  
};

export default RedirectComponent;
