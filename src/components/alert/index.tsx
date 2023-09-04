import React from "react";
import Button from "@mui/material/Button";

type AlertProps = {
  handleClose: () => void;
};
const Alert: React.FC<AlertProps> = ({ handleClose }) => {
  return (
    <div>
      <div>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </div>
      <div>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </div>
    </div>
  );
};
export default Alert;
