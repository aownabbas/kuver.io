import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Image from "next/image";

const style = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#1d222e",
    borderRadius: "5px",
    bgcolor: "#1d222e",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    border: "none",
    color: "white",
  },
  centeringContent: {
    textAlign: "center",
    textAlign: "center",
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "25px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    paddingTop: "5vh",
  },
  noButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    textTransform: "capitalize",
    border: "1px solid #353452",
    "&:hover": {
      backgroundColor: "inherit",
      textShadow: "none",
      border: "1px solid #353452",
    },
  },
  yesButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    color: "#FFFFFF !important",
    textShadow: "none !important",
    textTransform: "capitalize",
    backgroundColor: "#353452",
    "&:hover": {
      backgroundColor: "#353452",
      textShadow: "none",
    },
  },
  modalStyles: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "#1d222e",
    borderRadius: "5px",
    bgcolor: "#1d222e",
    borderRadius: "5px",
    boxShadow: 24,
    p: 5,
    border: "none",
    color: "white",
    padding: "30px",
  },
  registerModalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "#1d222e",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    border: "none",
    color: "white",
    padding: "8px",
    height:"250px",
  },
  centeringContent: {
    textAlign: "center",
    textAlign: "center",
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "25px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    // padding: "10px",
  },
  noButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    textTransform: "capitalize",
    border: "1px solid #353452",
    "&:hover": {
      backgroundColor: "inherit",
      textShadow: "none",
      border: "1px solid #353452",
    },
  },
  yesButton: {
    width: "132px",
    height: "48px",
    borderRadius: "8px",
    color: "#FFFFFF !important",
    textShadow: "none !important",
    textTransform: "capitalize",
    backgroundColor: "#353452",
    "&:hover": {
      backgroundColor: "#353452",
      textShadow: "none",
    },
  },
};

const AuthorizeModal = ({
  modalOpened,
  setModalOpened,
  openModal,
  validModal,
  handleClose,src,heading,text,
  message,
  setMessage,
  modalState,
  messageText,
  setConfirmationModal,
  confirmationModal,
  confirmModalText,
  UnAuthorizeUsersActions,
  userStatus,
  validateUser,
  adminDataTable1,
  setValidModal,
  NewListForValidatedUsers
}) => {

  const router = useRouter();

  console.log(userStatus,'path')
  const {
    modalStyle,
    centeringContent,
    modalHeading,
    buttonGroup,
    noButton,
    yesButton,
    modalStyles,
    registerModalStyle,
  } = style;



  console.log("modalOpened",modalOpened);
  return (
    <div>
      <Modal
        open={modalOpened}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
              <Image
                src="/assets/images/user.png"
                height={64}
                width={64}
                alt="trash"
              />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              UnAuthorization
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              User un-authorized successfully
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <Box sx={buttonGroup}>
                <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788d",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    setModalOpened(false);
                    NewListForValidatedUsers()
                  }}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
              <Image
                src="/assets/images/222333.png"
                height={150}
                width={150}
                alt="trash"
              />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              Congratulation
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              {modalState}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <Box sx={buttonGroup}>
                <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788d",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    router.reload("/");
                    // setOpenModal(false);
                  }}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={validModal}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
              <Image
                src={src}
                height={150}
                width={150}
                alt="trash"
              />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              {heading}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              {text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <Box sx={buttonGroup}>
                <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788D",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() =>handleClose()}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        // open={errorPopup}
        open={confirmationModal}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyles}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
          <Image
                src={src}
                height={150}
                width={150}
                alt="trash"
              />
              </Box>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              {confirmModalText}
            </Typography>
              <div className="d-inline ">
              <div className="float-start mt-4">
              <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788d",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    setConfirmationModal(false);
                  }}
                >
                  No
                </Button>
                </div>
                <div className="float-end mt-4">
                  
              <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788d",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    console.log("statejdn",userStatus);
                    if(userStatus == "validated"){
                    setConfirmationModal(false);
                    UnAuthorizeUsersActions();
                    }else if(userStatus == "not validated" || userStatus == "unAuthorized"){
                      validateUser();
                      setConfirmationModal(false);
                      }
                      else if( confirmModalText == "Do you want to Validate this k-Bond ?"){
                        setConfirmationModal(false);
                        adminDataTable1();
                      }
                  }}
                >
                  Yes
                </Button>
                </div>
              </div>
               
              {/* </Box> */}
            {/* </Box> */}
          </Box>
        </Box>
      </Modal>
    
     
      <Modal
        open={message}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={registerModalStyle}>
            <div className="centertxt">
            <Typography className="semibold"
              id="modal-modal-description"
              sx={{ textAlign: "center" }}
            >
           {messageText}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
                mt: 3
              }}
            >
              <Box sx={buttonGroup}>
                <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788d",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    // router.reload("/")
                    {messageText == 'Your email is verified now. you will be notify via email when admin will authorize you for platfrom.' || messageText == 'your password changed successfully!'?
                    router.push("../onBoarding/SignIn"):
                    setMessage(false)}
                  }}
                >
                  Okay
                </Button>
              </Box>
            </Box>
            </div>
          </Box>
          
        </Box>
      </Modal>

      <Modal
        open={validModal}
        // onClose={handlemobileclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={modalStyle}>
            <Box mb={2} sx={{ p: 2, textAlign: "center !important" }}>
              <Image
                src={src}
                height={160}
                width={150}
                alt="trash"
              />
            </Box>
            <Typography id="modal-modal-title" sx={modalHeading}>
              {heading}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center !important" }}
            >
              {text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <Box sx={buttonGroup}>
                <Button
                  // variant="contained"
                  sx={{
                    backgroundColor: "#74788D",
                    color: "white",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() =>handleClose()}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthorizeModal;
