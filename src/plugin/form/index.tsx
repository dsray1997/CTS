import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Editor from "../textEditor";
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
const Form: React.FC<{
  FormData: FormDataType[];
  onFormChange?: (params: any) => void;
}> = ({ FormData, onFormChange }) => {
  const [localFromData, setLocalFromData] = useState<FormDataType[]>([]);
  useEffect(() => {
    setLocalFromData(FormData);
  }, [FormData]);
  const handleChange = (value: any, index: any) => {
    const formArr = [...localFromData];
    const tempData = { ...localFromData[index] };
    tempData.defaultValue = value;
    formArr[index] = tempData;
    setLocalFromData([...formArr]);
    if (onFormChange) {
      onFormChange([...formArr]);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {localFromData.map((data, index) => (
          <Grid
            item
            xs={data.grid}
            key={`grid-${index}`}
            style={{ display: data.isHidden ? "none" : "inherit" }}
          >
            <Fields
              key={`field-${index}`}
              data={data}
              handleChange={(val: any) => handleChange(val, index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
const Fields: React.FC<{ data: any; handleChange: any }> = ({
  data,
  handleChange,
}) => {
  if (data.type == "text" || data.type == "url" || data.type == "number") {
    return (
      <TextField
        onChange={(e) => handleChange(e.target.value)}
        value={data.defaultValue}
        type={data.type}
        style={{ width: "100%" }}
        id={`${data.name}+${data.id}`}
        label={data.label}
        variant="outlined"
      />
    );
  }
  if (data.type == "textarea") {
    return (
      <TextField
        onChange={(e) => handleChange(e.target.value)}
        value={data.defaultValue}
        type={data.type}
        style={{ width: "100%" }}
        id={`${data.name}+${data.id}`}
        label={data.label}
        variant="outlined"
        multiline
        rows={4}
      />
    );
  }

  if (data.type == "select") {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        defaultValue={data.defaultValue}
        options={data.optionList}
        sx={{ width: "100%" }}
        onChange={(e, newValue) => handleChange(newValue, e)}
        renderInput={(params) => (
          <TextField
            {...params}
            id={`${data.name}+${data.id}`}
            label={data.label}
          />
        )}
      />
    );
  }
  if (data.type == "multi-select") {
    return (
      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        defaultValue={data.defaultValue}
        options={data.optionList}
        sx={{ width: "100%" }}
        onChange={(e, newValue) => handleChange(newValue, e)}
        renderInput={(params) => (
          <TextField
            {...params}
            id={`${data.name}+${data.id}`}
            label={data.label}
          />
        )}
      />
    );
  }
  if (data.type == "date") {
    return (
      <FormControl style={{ width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={data.label}
            value={dayjs(data.defaultValue)}
            onChange={(newValue) => handleChange(newValue)}
          />
        </LocalizationProvider>
      </FormControl>
    );
  }
  if (data.type == "datetime") {
    return (
      <FormControl style={{ width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={data.label}
            value={dayjs(data.defaultValue)}
            onChange={(newValue) => handleChange(newValue)}
          />
        </LocalizationProvider>
      </FormControl>
    );
  }

  if (data.type == "html") {
    return (
      <Editor
        label={data.label}
        value={data.defaultValue}
        onChange={(content: any) => handleChange(content)}
      />
    );
  }
  if (data.type == "check-box") {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={data.defaultValue}
              checked={data.defaultValue}
              onChange={(e) => handleChange(e.target.checked)}
            />
          }
          label={data.label}
        />
      </FormGroup>
    );
  }
  if (data.type == "header") {
    return (
      <Typography variant="h6" gutterBottom>
        {data.label}
      </Typography>
    );
  } else {
    return <div></div>;
  }
};

export default Form;
