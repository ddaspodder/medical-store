import * as React from "react";
import Box from "@mui/material/Box";
import Button from "../core/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  style: styleProps,
  children,
  label,
  buttonVariant,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modalStyle = { ...style, ...styleProps };
  return (
    <div>
      <Button
        variant={buttonVariant ? buttonVariant : "contained"}
        onClick={handleOpen}
      >
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>{children({handleClose})}</Box>
      </Modal>
    </div>
  );
}
