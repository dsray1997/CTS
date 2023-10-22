import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Avatar from "@mui/material/Avatar";
import organisation from "@/assets/organisation.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@/plugin/Icon";
import { updateList } from "@/store/actions/listActions";

export interface MenuItem {
  open: boolean;
  accessible: true;
  label: string;
  name: string;
  type: string;
  imageName: string;
  homeName: string;
  subItems: MenuItem[];
}
interface dispatchFunction {
  type: string;
  payload: any;
}
export default function Sidebar(props: any) {
  const dispatch: React.Dispatch<dispatchFunction> = useDispatch();
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
  const app = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  React.useEffect(() => {
    setMenuItems(app.modules);
  }, [app.modules]);
  const handleClick = (idx: number) => {
    let _menuItems = [...menuItems];
    let __menuItem = {..._menuItems[idx]}
    __menuItem.open = !__menuItem.open;
    _menuItems[idx] = __menuItem;
    setMenuItems([..._menuItems]);
  };

  const handleRoute = (item: any) => {
    dispatch(updateList("columns", []));
    navigate(`/${item.name}`, { state: { ...item } });
  };

  return (
    <>
      {props.displayProfile && (
        <List component="nav">
          <ListItemButton
            style={{
              borderRadius: "10px",
              margin: "0 20px",
              marginTop: "30px",
              alignItems: "center",
            }}
            selected
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: "#E3E3E3",
                  borderRadius: "50%",
                  height: "60px",
                  width: "60px",
                }}
                variant="square"
              >
                <img src={organisation} alt="organisation" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="Legal Bharat Services"
              style={{ fontSize: "15px", paddingLeft: "17px", color:"#efefef", display:"inline-block"}}
              secondary={<React.Fragment>{"Indranil Biswas"}</React.Fragment>}
             
            />
          </ListItemButton>
        </List>
      )}
      <List
        sx={{ width: "100%"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menuItems.map((item, i) => {
          if (!item.subItems.length) {
            return (
              <ListItemButton key={item.name} onClick={() => handleRoute(item)}>
                <ListItemIcon>
                  <Icon iconName={item.imageName} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          } else {
            return (
              <>
                <ListItemButton key={item.name} onClick={() => handleClick(i)}>
                  <ListItemIcon>
                    <Icon iconName={item.imageName} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subitem) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={subitem.name}
                          onClick={() => handleRoute(subitem)}
                        >
                          <ListItemIcon>
                            <Icon iconName={subitem.imageName} />
                          </ListItemIcon>
                          <ListItemText primary={subitem.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          }
        })}
      </List>
    </>
  );
}
