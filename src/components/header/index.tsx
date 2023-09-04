import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { dialogControl } from "../../store/actions/dialogActions";
import { Dispatch } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { drawerControl } from "@/store/actions/drawerActions";

const maxDrawerWidth = 280;
const minDrawerWidth = 64;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  keycount: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, keycount }) => ({
  marginLeft: keycount > 0 ? open ? maxDrawerWidth : minDrawerWidth:0,
  width: `calc(100% - ${ keycount > 0 ? open ? maxDrawerWidth : minDrawerWidth:0}px)`,
  // zIndex: theme.zIndex.drawer + 1,
  background: "rgba(255, 255, 255, 0.8)",
  color: "GrayText",
  boxShadow: "0px 0px 6px 0px #b9b8b821",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
interface dispatchFunction {
  type: string;
  payload: any;
}
export default function MiniDrawer(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const params = useParams();
  let _keyCount = Object.keys(params).length;


  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
const confirmLogout = ()=>{
  //alert ("mcndskjfhskdj")
  if(app.me.roles== "super-admin"){
    navigate(`/admin-login`, {
      state: { }
    });
    //localStorage.removeItem(localStorage.access_token)
    localStorage.clear()

  }else{
    navigate(`/login`, {
      state: { }
    });
    localStorage.clear()

  }
}

const handleCreateTicket = () => {
  let data = {name : "tickets"};
  dispatch(drawerControl(
    `Add Tickets`,
     "add",
     { ...data },
     true,
     true,
     '25%'
   ));
};
   const logOut =()=>{
    dispatch(dialogControl("Do you want to logout", "alert", ()=>confirmLogout(), true, false));
   }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={confirmLogout}>Logout</MenuItem>

    </Menu>
  );
  return (
    <AppBar position="fixed" open={props.isOpen} keycount={_keyCount}>
      <Toolbar>
      {_keyCount > 0 &&  <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            marginLeft: 2,
          }}
        >
          <SearchIcon />
        </IconButton>}
         
        <Button
         onClick={() => handleCreateTicket()}
         size="small"
         style={{marginLeft: 2}}
         variant="outlined"
       >
         {'+ Create Ticket'}
       </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {_keyCount == 0 && 
         <Button
         onClick={() => navigate(`/login`, {
          state: { }
        })}
         size="small"
         variant="outlined"
       >
         {'login'}
       </Button>}
      
          {_keyCount>0  && <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
         {_keyCount>0 && <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>}
          {renderMenu}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
