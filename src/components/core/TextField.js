import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export default function TextFields({ label, value, onChange, ...others }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        onChange={handleChange}
        {...others}
      />
    </FormControl>
  );
}
