import axios from "axios";
import { api } from "@/envConfig";
import { token } from "@/services/config";
import * as apis from "@/services/api";
let accessToken = localStorage.getItem("access_token");
function post(url: string, params: object) {
  return new Promise((resolve, reject) => {
    const HOST = api.host;
    if (url !== null && url !== "") {
      if (accessToken !== null || url == apis.loginHandler.login) {    
      url = HOST + url;
        axios
          .post(url, params, {
            headers: {
              dataType: "jsonp",
              contentType: "application/json",
              Authorization: `${token.type} ${accessToken}`,
            },
          })
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((err) => {
            reject(err);
          });
      }
   }
  });
}

function put(url: string, params: object) {
  return new Promise((resolve, reject) => {
    const HOST = api.host;
    if (url !== null && url !== "") {
      url = HOST + url;
      if (accessToken !== null) {
        axios
          .put(url, params, {
            headers: {
              dataType: "jsonp",
              contentType: "application/json; charset=utf-8",
              Authorization: `${token.type} ${accessToken}`,
            },
          })
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
}
function get(url: string, params: object) {
  if (url !== null && url !== "") {
    return new Promise((resolve, reject) => {
      const HOST = api.host;
      url = HOST + url;
      if (accessToken !== null) {
        axios
          .get(url, {
            headers: {
              dataType: "jsonp",
              contentType: "application/json; charset=utf-8",
              Authorization: `${token.type} ${accessToken}`,
            },
            params: params,
          })
          .then((resp) => {
              resolve(resp.data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
function removeToken() {
  localStorage.removeItem("access_token");
}
export { get, post, put, removeToken };
