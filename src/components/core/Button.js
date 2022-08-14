import React from "react";
import Button from "@mui/material/Button";

const ButtonComp = ({
  onClick: onClickHandler,
  children,
  variant = "contained",
  style,
  ...other
}) => {
  return (
    <div>
      <Button
        variant={variant}
        onClick={onClickHandler}
        style={style}
        {...other}
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComp;
