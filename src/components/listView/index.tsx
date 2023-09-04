import React, { useEffect, Dispatch } from "react";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DataTable from "@/plugin/dataTable";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PublishIcon from "@mui/icons-material/Publish";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button } from "@mui/material";
// import * as httpClient from "@/services/httpClient";
// import * as api from "@/services/api";
import { columns as config} from "@/appConfig";
import { setList, updateList } from "@/store/actions/listActions";
import { rows as rd } from "@/appConfig"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

interface dispatchFunction {
  type: string;
  payload: any;
}
const ListView: React.FC <{name:any}>= ({name}) => {
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const list = useSelector((state: RootState) => state.list);
  const [rows, setRows] = React.useState<any[] | null>(null);
  const [columns, setColumns] = React.useState<any[] | null>(null);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [selectedPage, setSelectedPage] = React.useState<number>(0);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  useEffect(() => {
    if (
      list.name == name &&
      list.rows != null &&
      list.columns != null &&
      list.selectedPage != 0
    ) {
      setRows(list.rows);
      setColumns(list.columns);
      setPageCount(list.pageCount);
      setSelectedPage(list.selectedPage);
      setIsLoaded(true);
    } else {
      getListData();
    }
  }, [name]);

  const getListData = () => {
    getColumns();
  };

  const getColumns = () => {
    // const inputParams: any = {};
    // const _endpoint = null;
    const _config:any = {...config}
    let _name :string = name||'';
    if(_name != undefined && _name != '' ){
      dispatch(setList(_name, 1, 1));
      setColumns(_config[_name]);
      dispatch(updateList("columns", _config[_name]));
      getRows();
    }
  
    // if (_endpoint !== null) {
    //   const promise = Promise.resolve(httpClient.get(_endpoint, inputParams));
    //   promise.then((response: any) => {
    //     if (response !== null && response?.data) {
    //       dispatch(updateList("columns", response?.data));
    //       getRows();
    //     }
    //   });
    // }
  };
  const getRows = () => {
    setIsLoaded(true);
    setPageCount(1);
    setSelectedPage(1);
    setRows([...rd]);
    dispatch(updateList("rows", []));
    // const inputParams: any = {};
    // let _endpoint = "";
    // if (name == "component") {
    //   _endpoint = '';
    //   inputParams.active = true;
    // }
    // if (_endpoint !== null) {
    //   const promise = Promise.resolve(httpClient.get(_endpoint, inputParams));
    //   if (isValidParam(promise)) {
    //     promise.then((response: any) => {
    //       if (isValidParam(response)) {
    //         setPageCount(1);
    //         setSelectedPage(1);
    //         setRows(response.body);
    //         dispatch(setList(name, 1, 1));
    //         dispatch(updateList("rows", response.body));
    //       }
    //     });
    //   }
    // }
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item style={{ height: "36px" }}>
            <Stack direction="row" spacing={1} style={{ float: "left" }}>
              <Button
                variant="outlined"
                size="small"
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderColor: "#8e8e8e30",
                  color: "#8e8e8eb5",
                }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderColor: "#8e8e8e30",
                  color: "#8e8e8eb5",
                }}
              >
                <PublishIcon />
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderColor: "#8e8e8e30",
                  color: "#8e8e8eb5",
                }}
              >
                <DeleteOutlineIcon />
              </Button>
            </Stack>
            <Paper
              component="form"
              variant="outlined"
              style={{ float: "left", marginLeft: "10px" }}
              sx={{
                p: "0px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <IconButton sx={{ p: "5px" }} aria-label="menu">
                <FilterAltIcon fontSize="small" />
              </IconButton>
              <Divider sx={{ height: 27, m: 0.5 }} orientation="vertical" />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                size="small"
                margin="none"
                placeholder="Search"
                inputProps={{ "aria-label": "search " }}
              />
              <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Stack spacing={2} style={{ float: "right", lineHeight: "36px" }}>
              <Pagination
                size="small"
                count={pageCount}
                defaultPage={selectedPage}
                boundaryCount={2}
              />
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            {isLoaded && (
              <DataTable columns={columns} rows={rows} selectionKey="name" />
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ListView;
