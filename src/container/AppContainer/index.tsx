import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Container from "@mui/material/Container";
import LayoutContainer from "@/container/LayoutContainer";
import { trogleSidebar } from "@/store/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import BreadCrumb from "@/components/breadCrumb";
import { useParams } from "react-router-dom";
const maxDrawerWidth = 280;
// const minDrawerWidth = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: maxDrawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: maxDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AppContainer() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  const params = useParams();
  let _keyCount = Object.keys(params).length;

  React.useEffect(() => {
    setOpen(app.sidebarIsMinimized);
  }, [app.sidebarIsMinimized]);
  const handleDrawerClose = () => {
    dispatch(trogleSidebar(!open));
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "-webkit-box" }}>
      {/* <CssBaseline /> */}
      <Header isOpen={_keyCount>0 && open} />

     { _keyCount>0 && <Drawer variant="permanent" open={open}>
        <IconButton
          size="small"
          onClick={handleDrawerClose}
          style={{
            position: "fixed",
            top: "20px",
            height: "25px",
            width: "25px",
            left: open ? "268px" : "52px",
            zIndex: 99999,
            backdropFilter: "blur(6px)",
            background: "red",
            color: "white",
            border: "none",
            transition: "0.3s ease",
          }}
        >
          {!open ? (
            <ChevronRightIcon sx={{ height: "0.8em", width: "0.8em" }} />
          ) : (
            <ChevronLeftIcon sx={{ height: "0.8em", width: "0.8em" }} />
          )}
        </IconButton>
        <Sidebar displayProfile={open} />
      </Drawer>}
      <Box component="main" sx={{ flexGrow: 1, marginTop: "65px" }}>
      { _keyCount>0 && <BreadCrumb />}
        <Container style={{ padding: "15px" }} maxWidth={false}>
          <LayoutContainer />
        </Container>
      </Box>
    </Box>
  );
}
