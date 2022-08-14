import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

export default function MUISelect({ label, value, list, onChange, ...others }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          {...others}
        >
          {list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
