import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Link, Stack, Typography } from "@mui/material";
import facebookLogo from "@/assets/facbook.png";
import googleLogo from "@/assets/google.png";
import loginImage from "@/assets/loginImage.jpeg";
import * as httpClient from "@/services/httpClient";
import * as api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import decodeJwt from "@/services/decoder";
import { setApp } from "@/store/actions/appActions";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { groupByObjectArrayByProperty } from "@/utils";
import { useParams } from "react-router-dom";


const CustomBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "0 86px 0 83px",
  },
}));
const cardStyle:any = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignContent: "center",
  alignItems: "stretch"
};
interface dispatchFunction {
  type: string;
  payload: any;
}
interface moduleObjType {
  name: string;
  label: string;
}
export default function Login() {
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [btnLabel, setBtnLabel] = React.useState("Get Started");
  const [loading, setLoading] = React.useState(false)
  const [modules, setModules] = React.useState<moduleObjType | null>(null);;
  const [instituteLink, setInstituteLink] = React.useState<moduleObjType[] | null>(null);;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const params = useParams();


  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    let _module = {
      open: false,
      accessible: true,
      label: "Dashboard",
      name: "dashboard",
      type: "link",
      imageName: "Dashboard",
      subItems: [],
    }
    setLoading(true);
    setBtnLabel('Redirecting')
      const inputParams: { email: string; password: string } = {
        email: user,
        password: pass,
      };

      // const promise = Promise.resolve(httpClient.post(api.loginHandler.login, inputParams));

      // promise.then((response: any) => {
      //   if (response?.body?.accessToken) {
      //     localStorage.setItem("access_token", response.body.accessToken);
      //     const decodedToken = decodeJwt(response.body.accessToken);

      setLoading(false);
      setBtnLabel('Get Started');  
      setModules(_module);
      //   } else {
      //     setLoading(false);
      //     setBtnLabel('Get Started');
      //   }
      // });
  
  
  };
  
  if (modules != null) {
    navigate(`/${modules.name}`, {
      state: { ...modules }
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div >
        <div style={cardStyle} >
          <CustomBox
            display={"flex"}
            alignItems="center"
            height={"100vh"}
            justifyContent={"center"}
          >
            <div>
              <Typography
                mb={2}
                component="h2"
                fontWeight={400}
                fontSize={"25px"}
                lineHeight={"32px"}
              >
                Sign in
              </Typography>
              <Typography
                mb={2}
                component="p"
                color={"#897F7F"}
                fontWeight={500}
                fontSize={"12px"}
                lineHeight={"18px"}
              >
                New user?&nbsp;
                <Link
                  href="#"
                  color={"#2CB972"}
                  underline="none"
                  fontWeight={500}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                >
                  {"Create an account"}
                </Link>
              </Typography>
              {/* Email / Phone No Field */}
              <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
                <TextField
                  id="email_or_phone"
                  label="Email / Phone Number"
                  variant="outlined"
                  value={user}
                  onChange={(e: any) => setUser(e.target.value)}
                />
              </FormControl>
              {/* Password Field */}
              <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={pass}
                  onChange={(e: any) => setPass(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Link
                href="#"
                mb={"14px"}
                color={"#585757"}
                display={"flex"}
                justifyContent={"end"}
                fontWeight={500}
                fontSize={"12px"}
                lineHeight={"18px"}
              >
                {"Forgot password?"}
              </Link>
              <LoadingButton

                fullWidth
                onClick={() => onSubmit()}
                loading={loading}
                loadingPosition="start"
                startIcon={<div style={{ width: loading ? 20 : 0 }} />}
                variant="contained"
              >
                <span>{btnLabel}</span>
              </LoadingButton>

              <div className="horizontal_dotted_line">
                <span style={{ margin: "0 8px" }}>OR</span>
              </div>
              <Stack direction="row" justifyContent="center">
                <IconButton>
                  <img src={googleLogo} alt="example" />
                </IconButton>
                <IconButton>
                  <div style={{ width: "36px", paddingTop: "5px" }}>
                    <img src={facebookLogo} alt="example" />
                  </div>
                </IconButton>
              </Stack>
            </div>
          </CustomBox>
        </div>
      </div>
    </Box>
  );
}
