import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { dialogControl } from "../../store/actions/dialogActions";
import Alert from "@/components/alert";
import { useParams } from "react-router-dom";
interface dispatchFunction {
  type: string;
  payload: any;
}
export default function DialogAppContainer() {
  const dispatch: React.Dispatch<dispatchFunction> = useDispatch();
  const dialog = useSelector((state: RootState) => state.dialog);

  const handleClose = () => {
    dispatch(dialogControl("", "", null, false, false));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ paddingBottom: "15px" }}>{dialog.title}</div>
      <div>
        <DialogContentBody
          type={dialog.type}
          handleClose={handleClose}
          dialog={dialog}
        />
      </div>
    </div>
  );
}
interface Dialog {
  title: string;
  type: string;
  data: any;
  open: boolean;
  fullScreen: boolean;
}
type DialogContentBodyProps = {
  type: string;
  handleClose: any;
  dialog: Dialog;
};
const DialogContentBody: React.FC<DialogContentBodyProps> = ({
  type,
  handleClose,
  dialog,
}) => {
  const params = useParams();
  const object = dialog?.data?.object || params.object;
  if (type == "alert") {
    return <Alert handleClose={handleClose} />;
  } else {
    return <div />;
  }
};
