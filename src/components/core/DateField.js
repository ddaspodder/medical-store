import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import FormControl from "@mui/material/FormControl";
export default function BasicDateField(props) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField {...props} format="DD-MM-YYYY" />
      </LocalizationProvider>
    </FormControl>
  );
}
