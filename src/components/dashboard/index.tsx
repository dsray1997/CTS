import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import registrationImage from "@/assets/onboarding-image-two.jpeg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListView from "../listView";
import { Avatar, ListItemIcon } from "@mui/material";
import Icon from "@/plugin/Icon";

const CardIcon =()=>{
  return (
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
      <Icon iconName={"ConfirmationNumberTwoTone"}/>
    </Avatar>
  </ListItemIcon>
  )
}

export default function Deshboard() {
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Grid container spacing={2}>
       
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Box width={"50%"}>
                  <Typography variant="body2" color="text.secondary">
                    Total Tickets
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +2.5%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={700}
                    lineHeight={1.5}
                  >
                    1200
                  </Typography>
                </Box>
                <Box
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardIcon/>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Box width={"50%"}>
                  <Typography variant="body2" color="text.secondary">
                    Pending Tickets
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +2.5%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={700}
                    lineHeight={1.5}
                  >
                    1200
                  </Typography>
                </Box>
                <Box
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                <CardIcon/>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Box width={"50%"}>
                  <Typography variant="body2" color="text.secondary">
                  Unassigned Tickets
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +2.5%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={700}
                    lineHeight={1.5}
                  >
                    1200
                  </Typography>
                </Box>
                <Box
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                <CardIcon/>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
        <ListView name={'tickets'}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
