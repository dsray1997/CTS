import React, { Dispatch, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "../../plugin/dataTable";
import Form from "@/plugin/form";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import * as httpClient from "@/services/httpClient";
import * as api from "@/services/api";
import { form } from "@/appConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoadingButton } from "@mui/lab";
import { drawerControl } from "@/store/actions/drawerActions";
export interface FormDataType {
  id: number;
  name: string;
  label: string;
  type: string;
  fieldLength: number;
  isHidden: boolean;
  isRequired: boolean;
  isSystemField: boolean;
  isReadonly: boolean;
  defaultValue: any;
  isEmailField: boolean;
  isPhoneField: boolean;
  isUrlField: boolean;
  isCurrencyField: boolean;
  optionList: any[];
  grid: any;
}

interface dispatchFunction {
  type: string;
  payload: any;
}

export default function FormConfig() {
  const dispatch: Dispatch<dispatchFunction> = useDispatch();
  const [formData, setFormData] = useState<FormDataType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const drawer = useSelector((state: RootState) => state.drawer);
  const params = useParams();
  useEffect(() => {
    const _config:any = {...form}
    let _name :string = drawer.data.name || '';
    if(_name != undefined && _name != '' ){
      setFormData(_config[_name]);
    }
    
  }, [drawer]);

  const handleSave = () => {
    setLoading(true);
    dispatch(drawerControl("", "", null, false, false, "0%"));
  }
  const handleCancle = () => {
    setLoading(false);
    dispatch(drawerControl("", "", null, false, false, "0%"));
  }
  return (
    <div>

      <div>
      <Form
              FormData={formData}
              onFormChange={(data) => setFormData(data)}
            />
      </div>
      <div >
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 , mb:3}}>
            <Button
              color="inherit"
              disabled={loading}
              onClick={handleCancle}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <LoadingButton
                onClick={handleSave}
                loading={loading}
                loadingPosition="start"
                startIcon={<div style={{ width: loading ? 20 : 0 }} />}
                variant="contained"
              >
                Save
              </LoadingButton>
          </Box>
      </div>

    </div>
  );
}
