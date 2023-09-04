import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import RedirectComponent from "./container/RedirectComponent";
import DrawerAppContainer from "./container/DrawerAppContainer";
import DialogAppContainer from "./container/DialogAppContainer";
// import Login from "./components/login";

import { RootState } from "./store";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const App: React.FC = () => {
  const dialog = useSelector((state: RootState) => state.dialog);

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(dialog.open);
  }, [dialog]);

  const handleClose = () => {
    setOpen(false);
  };
  // if (localStorage.getItem("token") === null) {
  //   return <Login />;
  // } else {
  return (
    <>
      <Routes>
        <Fragment>
          <Route
            path="/:name/:control/:suffix"
            element={<RedirectComponent />}
          />
          <Route path="/:name/:control" element={<RedirectComponent />} />
          <Route path="/:name" element={<RedirectComponent />} />
          <Route path="/" element={<RedirectComponent />} />
        </Fragment>
      </Routes>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogAppContainer />
      </Dialog>
      <DrawerAppContainer />
    </>
  );
  // }
};

export default App;
