import React,{ useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "85%",
  left: "15%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "none !Important",
backgroundColor:"#1d222e !Important",
//   border: "2px solid #000",
  boxShadow: "none !Important",
  p: 2,
  borderRadius:"5px",
  color:"white",
};

export default function CopyAddressModal({
  copyAddressModal,
  setCopyAddressModal,
  messageText,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
//   const handleClose = () => setCopyAddressModal(false);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={copyAddressModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // hideBackdrop={true}
        style={{boxShadow:"none",backgroundColor:"none"}}
      >
        <Box sx={style}>
          <div className="d-flex">
            <div className="ms-2"><i class="ri-check-line regular" style={{color:"green"}}></i></div>
            <div className="ms-3 mt-1">
          <Typography id="modal-modal-description regular" className="text-center">
            {messageText}
          </Typography>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
