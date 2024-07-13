import React, { useEffect, useState, forwardRef } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";

// modal imports
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, textAlign } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import PurchaseBondAction from "../../../redux/actions/PurchaseBond";
import { FormControl, MenuItem, Select } from "@mui/material";
import AuthorizeModal from "../../modals/AuthorizeModal";
import CopyAddressModal from "../../modals/CopyAddressModal";

const BackdropUnstyled = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  minWidth: "550px",
  // bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  bgcolor: "#252b3b",
  // border: "2px solid currentColor",
  borderRadius: "12px",
  minHeight: "600px",
  padding: "16px 32px 24px 32px",
});

function StackBondForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const [bondModalData, setBondModalData] = useState({
    amount: "",
    month: "",
    balance: "",
    adress: "",
  });

  console.log(bondModalData.adress);
  const [message,setMessage] = useState(false)
  const [messageText,setMessageText] = useState()

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    setWalletAddress(loginData.data.user.type);
    setBondModalData((s) => ({
      ...s,
      adress:
        loginData.data.user.type == "wallet" ? loginData.data.user.email : "",
    }));
    setAddress(loginData.data.user.email);
    console.log(loginData.data.user.type, "type");
  }, []);
  const purchaseBond = () => {
    var monthBondData;
    if (bondModalData.month == 3) {
      monthBondData = 1;
    } else if (bondModalData.month == 6) {
      monthBondData = 2;
    } else if (bondModalData.month == 9) {
      monthBondData = 3;
    } else if (bondModalData.month == 12) {
      monthBondData = 4;
    }
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    console.log(bondModalData, "amount");
    if (bondModalData.amount == "") {
      setMessage(true)
      setMessageText("enter amount")
    } else if (bondModalData.month == "") {
      setMessage(true)
      setMessageText("enter month")
    } else if (bondModalData.adress == "") {
      setMessage(true)
      setMessageText("enter address")
    } else if (bondModalData.amount == "" && bondModalData.month == "") {
      setMessage(true)
      setMessageText("enter amount & month")
    } else if (bondModalData.amount == "" && bondModalData.adress == "") {
      setMessage(true)
      setMessageText("enter amount & address")
    } else if (bondModalData.month == "" && bondModalData.adress == "") {
      setMessage(true)
      setMessageText("enter address & month")
    } else if (
      bondModalData.amount == "" &&
      bondModalData.month == "" &&
      bondModalData.adress == ""
    ) {
      setMessage(true)
      setMessageText("enter address & month & amount")
    } else if (
      bondModalData.amount !== "" &&
      bondModalData.month !== "" &&
      bondModalData.adress !== ""
    ) {
      const param = `price=${bondModalData.amount}&stacking_period=${monthBondData}&address=${bondModalData.adress}`;
      dispatch(
        PurchaseBondAction(
          param,
          loginData.data.token,
          bondPurchaseSuccess,
          bondPurchaseError
        )
      );
    }
  };
  const [modalState, setModalState] = useState();
  const bondPurchaseSuccess = (res) => {
    if (res.status == true) {
      setopenModal(true);
      setModalState(
        "You have successfully purchased the bond. You will be notified, Once your payment is verified"
      );
    }
    console.log(res, "succ");
    if (res.message == "You can buy only one bond") {
      setMessage(true)
      setMessageText("You can buy only one bond")
    } else if (res.message == "Minimum invest should be 5000") {
      setMessage(true)
      setMessageText("Minimum invest should be 5000$")
    } else if (res.message == "invalid address") {
      setMessage(true)
      setMessageText("invalid address")
    }
  };
  const bondPurchaseError = (err) => {
    console.log(err, "err");
  };
  // stack bond modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setBondModalData({
      ...bondModalData,
      [evt.target.name]: value,
    });
  };
  const handleChange2 = (evt) => {
    const value = evt.target.value;
    setBondModalData({
      ...bondModalData,
      adress: value,
    });
  };
  const handleChange1 = (evt) => {
    const value = evt.target.value;
    setBondModalData({
      ...bondModalData,
      month: value,
    });
  };
  const [openModal, setopenModal] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyAddressModal, setCopyAddressModal] = useState(false);
  const copyText = () => {
    const textToCopy = "0x4fE137eBD7DCa2333b40D250F578cd958aBe4558";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {setCopied(true)
        setCopyAddressModal(true);
        setMessageText("Address copied to clipboard");
        CloseCopyAddressModal()})
      .catch(() =>{ setCopied(false)});
    // setMessage(true)
    // setMessageText("Text copied to clipboard")
  };
  var [modalCount, setModalCount] = useState(0);
  function CloseCopyAddressModal() {
    const timer = setInterval(() => {
      modalCount++;
      if (modalCount == 2) {
        setCopyAddressModal(false)
      } else if(modalCount > 2){
        clearInterval(timer);
      }
    }, 1000);
  }
  return (
    <div className="row">
      <AuthorizeModal
        openModal={openModal}
        modalState={modalState}
        setopenModal={setopenModal}
        invalid={invalid}
        setInvalid={setInvalid}
        message={message} setMessage={setMessage} messageText={messageText}
      />
      <CopyAddressModal
        copyAddressModal={copyAddressModal}
        setCopyAddressModal={setCopyAddressModal}
        messageText={messageText}
      />
      <div className="col-lg-8 offset-lg-2">
        <div className=" bg-img mb-4" style={{ padding: "15px" }}>
          <h4 className="text-white text-center">No Bonds Purchased Yet</h4>
          <div className="text-center text-white mt-4">
            <Image
              src="/assets/images/empty.png"
              width={300}
              height={300}
              alt="iconbond"
              style={{ minWidth: "300px", minHeight: "300px" }}
            />
          </div>
          <div className="text-center mt-4 mb-2">
            <Button variant="contained" color="success" onClick={handleOpen}>
              Purchase Bond
            </Button>
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              slots={{ backdrop: Backdrop }}
            >
              <Box sx={style}>
                <div className="centered-element" style={{ width: "340px" }}>
                  <h2
                    className="text-center heding text-white"
                    id="unstyled-modal-title "
                  >
                    Purchase the Bond
                  </h2>
                  <div className="row mt-4">
                    <label className="w-100 h-100 py-2 lab text-muted">
                      Enter an amount you want to invest in USD{" "}
                      <span style={{ color: "#FF3030" }}> *</span>
                    </label>
                    <div className="input-border row align-items-center">
                      <div className="col-md-8">
                        <input
                          className="input amount regular-xsmall no-spinner custom-input text-white whitePlaceHolder"
                          placeholder="0.00"
                          type="number"
                          name="amount"
                          value={bondModalData.amount}
                          onChange={handleChange}
                          style={{ background: "transparent",color:"white" }}
                          autoComplete="off"
                        />
                      </div>
                      <div className="usd col-4 justify-content-end text-white">USD</div>
                    </div>
                  </div>
                  <div className="row mt-4  ">
                    <label className="w-100 h-100 py-1 lab text-muted">
                      Stacking Time <span style={{ color: "#FF3030" }}> *</span>
                    </label>
                    <div className="input-border row align-items-center">
                      <div className="col-md-12 p-0">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "100%" }}
                        >
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard" className="whitePlaceHolder text-white"
                            // value={bondModalData.month}
                            onChange={handleChange1}
                            style={{ background: "transparent" }}
                            // label="Age"
                            defaultValue="1"
                            sx={{boxShadow: 'none',
                              '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '0 !Important',
                              },
                              '.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '0 !Important',
                              },
                              'hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '0 !Important',
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                              },
                              '.MuiSvgIcon-root ': {
                                color: "white !important",
                                border: "0 !Important"
                              },
                              '.MuiOutlinedInput-notchedOutline': { border: "0 !Important" }
                            }}
                          >
                            <MenuItem value="1" disabled>
                            <p className="regular-xsmall text-white m-0 "
                                style={{
                                  // opacity: "0.5",
                                  fontWeight: "600",
                                 
                                }}
                              >
                                Select months
                              </p>
                            </MenuItem>
                            <MenuItem value={3}>
                            <p className="regular-small text-white m-0 mon"
                             
                              >
                                03 months
                              </p>
                            </MenuItem>
                            <MenuItem value={6}>
                            <p className="regular-small text-white m-0 mon"
                              
                              >
                                06 months
                              </p>
                            </MenuItem>
                            <MenuItem value={9}>
                            <p className="regular-small text-white m-0 mon"
                              
                              >
                                09 months
                              </p>
                            </MenuItem>
                            <MenuItem value={12}>
                            <p className="regular-small text-white m-0 mon"
                              >
                                12 months
                              </p>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <label className="w-100 h-100 py-1 lab text-muted">
                      Your Wallet Address{" "}
                      <span style={{ color: "#FF3030" }}> *</span>
                    </label>
                    <div className="input-border row align-items-center">
                      {walletAddress == "wallet" ? (
                        <input
                          className="input amountt regular-xsmall text-white whitePlaceHolder"
                          placeholder={bondModalData.adress}
                          type="text"
                          style={{ background: "transparent" }}
                          // value={address}
                          // onChange={handleChange}
                          disabled
                        />
                      ) : walletAddress == "email" ? (
                        <input
                          className="input amountt regular-xsmall text-white whitePlaceHolder"
                          placeholder="copy & paste your wallet address here..."
                          type="text"
                          style={{ background: "transparent" }}
                          value={bondModalData.adress}
                          onChange={handleChange2}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-success  regular-small text-white"
                      onClick={purchaseBond}
                      style={{
                        width: "240px",
                        height: "50px",
                        borderRadius: "90px",
                      }}
                    >
                      Purchase Bond
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-muted">
                      your payment will be sent to the mentioned wallet address
                      after purchasing a bond
                    </p>
                  </div>
                  <div className=" row  copy-box mt-2 align-items-center col-md-12">
                    <span
                      className="text-truncate col-md-10 adresss regular-xsmall text-white"
                      style={{ width: "273px" }}
                    >
                      0x4fE137eBD7DCa2333b40D250F578cd958aBe4558
                    </span>
                    <div
                      className="float-end col-md-2 d-flex justify-content-end "
                      style={{ marginLeft: "20px" }}
                    >
                      <Image
                        src="/assets/images/Vector.svg"
                        alt="vactor"
                        width={17}
                        height={20}
                        onClick={() => copyText()}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackBondForm;
