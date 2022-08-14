import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  severity,
  message,
  //   fwdRef,
  open,
  handleCloseAlert,
}) {
  //   const [open, setOpen] = React.useState(false);

  //   React.useImperativeHandle(fwdRef, () => ({
  //     handleClick,
  //   }));

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleCloseAlert();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

// export default React.forwardRef((props, ref) => (
//   <CustomizedSnackbars {...props} fwdRef={ref} />
// ));
