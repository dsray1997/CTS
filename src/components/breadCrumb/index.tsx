import React, { Dispatch } from "react";
import Box from "@mui/material/Box";
import { Button, ListItem, ListItemText } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { drawerControl } from "@/store/actions/drawerActions";
import { dialogControl } from "@/store/actions/dialogActions";
import { useDispatch } from "react-redux";
import Icon from "@/plugin/Icon";

const BreadCrumb: React.FC = () => {
  const { state } = useLocation();
  const controlObj = state;
  return (
    <Box sx={{ p: 0, backgroundColor: "#aeaeae26", height: "45px" }}>
      <div style={{ padding: "4px 10px 5px 10px" }}>
        <div style={{ float: "left" }}>
          <ListItem style={{ padding: "2px" }}>
            <ListItemText primary={controlObj?.label} />
          </ListItem>
        </div>
        <div style={{ float: "right", padding: "3px" }}>
          <BreadCrumbActions data={controlObj} />
        </div>
      </div>
    </Box>
  );
};

export default BreadCrumb;
interface actionObject {
  text: string;
  actionObject: string;
  icon: string;
}
interface dispatchFunction {
  type: string;
  payload: any;
}
const actionList: any = [
    {
      text: "Add",
      actionObject: "add",
      icon: 'AddTwoTone',
    
    },
  ];
const BreadCrumbActions: React.FC<{ data: any }> = ({ data }) => {
  const params: any = useParams();
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const handleClick = (callFrom: string, name: string | undefined) => {
    if (callFrom == "add") {
        dispatch(
          drawerControl(
           `Add ${data.label}`,
            "add",
            { ...data },
            true,
            true,
            getWidth(name)
          )
        );
      }
      if (callFrom == "import") {
        dispatch(dialogControl("Import", "import", { ...data }, true, false));
      }
  };
  
  const getWidth = (name: string | undefined) => {
    let width = "25%";
    

    return width;
  };
  if (params.name !== 'dashboard') {
    return (
      <>
        {actionList?.map((item: actionObject, idx: number) => (
          <Button
          key={'add' + idx}
            onClick={() => handleClick(item.actionObject, params.name)}
            size="small"
            variant="outlined"
            sx={{ marginLeft: 0 < idx ? "10px" : "0px" }}
            startIcon={<Icon iconName={item.icon} />}
          >
            {item.text}
          </Button>
        ))}
      </>
    );
  } else {
    return <div />;
  }
};
