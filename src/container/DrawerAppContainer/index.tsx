import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import { RootState } from "../../store";
import {
  drawerControl,
  drawerMinimizeControl,
} from "../../store/actions/drawerActions";
import "./drawerContainer.css";
import { useParams } from "react-router-dom";
import FormConfig from "@/components/configForm";

interface dispatchFunction {
  type: string;
  payload: any;
}
export default function AppContainer() {
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const drawer = useSelector((state: RootState) => state.drawer);
  const [open, setOpen] = React.useState(false);
  const [isMinimize, setIsMinimize] = React.useState(false);
  const [minimizable, setMinimizable] = React.useState(false);
  useEffect(() => {
    setOpen(drawer.open);
    setMinimizable(drawer.isMinimizable);
    setIsMinimize(drawer.isMinimized);
  }, [drawer]);

  const maxMinDrawer = (from: string) => {
    dispatch(drawerMinimizeControl(from == "min" ? true : false));
  };
  const closeDrawer = () => {
    dispatch(drawerControl("", "", null, false, false, "0%"));
  };
  const fullWidth = window.innerWidth;
  const fullHeight = window.innerHeight;
  const drawerWidthParcentage = drawer.width || "40%";
  const dw = drawerWidthParcentage.split("%")[0];
  const drawerWidth = fullWidth * 0.01 * parseInt(dw);
  if (open) {
    if (isMinimize) {
      return (
        <div className="minimized-drawer-bar">
          <div style={{ backgroundColor: "#717171" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "#fff",
                  paddingLeft: "20px",
                  textAlign: "left",
                  height: "40px",
                  lineHeight: "40px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "20px" }}>
                    {drawer.title}
                  </span>
                </div>
              </div>

              <div>
                <IconButton onClick={() => maxMinDrawer("max")}>
                  {" "}
                  +
                  <i
                    className="fas fa-window-maximize"
                    title="Maximize"
                    style={{
                      color: "#fff",
                      fontWeight: "normal",
                      fontSize: "1.0em",
                      cursor: "pointer",
                    }}
                  ></i>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="drawer-container">
          <div className="drawer-backdrop">
            <div className="drawer" style={{ width: drawerWidth }}>
              <div className="drawer-toolbar">
                <div className="sf-drawer-title">
                  <Typography
                    variant="h6"
                    style={{
                      color: "#fff",
                      paddingLeft: "24px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 400,
                      fontSize: "24px",
                      textAlign: "left",
                      height: "48px",
                      lineHeight: "48px",
                    }}
                  >
                    {drawer.title}
                  </Typography>
                  <span className="drawer-button-right">
                    {minimizable && (
                      <IconButton
                        onClick={() => maxMinDrawer("min")}
                        title={"Minimize"}
                      >
                        {" "}
                        -
                        <i
                          className="fas fa-window-minimize"
                          title="Minimize"
                          style={{
                            fontWeight: "normal",
                            fontSize: "1.0em",
                            cursor: "pointer",
                            color: "#fff",
                            marginLeft: 5,
                          }}
                        ></i>
                      </IconButton>
                    )}
                    <IconButton onClick={() => closeDrawer()} title={"CLOSE"}>
                      X
                    </IconButton>
                  </span>
                </div>
              </div>

              <div className="drawer-body" style={{height:(fullHeight-60),overflow:'auto'}}>
                <DrawerBody drawerData={drawer} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <></>;
  }
}
interface Drawer {
  title: string;
  type: string;
  data: any;
  open: boolean;
  isMinimized: boolean;
  isMinimizable: boolean;
  width: string;
}
const DrawerBody: React.FC<{ drawerData: Drawer }> = ({ drawerData }) => {
  if (drawerData.type == "add") {
    return <FormConfig />;
  } else {
    return <span />;
  }
};
