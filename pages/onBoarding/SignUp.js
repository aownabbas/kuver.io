import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SignUpAction from "../../redux/actions/SignUpAction";
import { useRouter } from "next/router";
import Image from "next/image";
import AuthorizeModal from "../../components/modals/AuthorizeModal";
import { URL } from "../../public/assets/path/path";

function SignUp() {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    amount: "",
    whatsapp: "",
    otp: "",
    metamaskUserEmail: "",
  });
  const [type, setType] = useState("email");
  // const [validation, setValidation] = useState(true);

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!signUpData.email.includes("@")) {
      // type = "wallet";
      setType("wallet");
    }
    console.log("typkdkde", type);
    const params = `first_name=${signUpData.firstName}&last_name=${signUpData.lastName}
    &metamail=${signUpData.metamaskUserEmail}&username=${signUpData.userName}&type=${type}&email=${signUpData.email}&amount=${signUpData.amount}&phone=${signUpData.whatsapp}`;
    dispatch(SignUpAction(params, signUpSuccess, signUpError));
  };
  const [Otp, setOtp] = useState(false);
  const signUpSuccess = (response) => {
    console.log(response);
    if (response.status == true) {
      if (response.message == "User registered successfully!") {
        setOtp(true);
        setMessage(true);
        setMessageText(
          "Successfully registered! You will recieve an Otp shortly"
        );
      }
    } else if (response.email == "A user already registerd with this email") {
      setMessage(true);
      setMessageText("User Already Registered");
    } else if (response.message == "please enter your address") {
      setMessage(true);
      setMessageText("please enter your address");
    } else if (response.message == "user address already exist") {
      setMessage(true);
      setMessageText("user address already exist");
    } else if (response.message == "invalid address") {
      setMessage(true);
      setMessageText("invalid address");
    } else if (response.message == "please enter your Email to recive OTP") {
      setMessage(true);
      setMessageText("please enter your Email to recive OTP");
    } else {
      setMessage(true);
      setMessageText("Please enter correct Email");
    }
  };
  const signUpError = (err) => {
    console.log(err);
  };

  const handleChange = (evt) => {

    const { name, value } = evt.target;

    if (name === "otp") {
      const otpValue = value.replace(/\D/g, "");
      if (otpValue.length <= 6) {
        setSignUpData((prevState) => ({
          ...prevState,
          otp: otpValue,
        }));
      }
    } else if (name === "firstName") {
      const result = value.replace(/[^a-z]/gi, "");
      if (result) {
        setSignUpData((prevState) => ({
          ...prevState,
          firstName: result,
        }));
      }
    } else if (name === "lastName") {
      const result = value.replace(/[^a-z]/gi, "");
      if (result) {
        setSignUpData((prevState) => ({
          ...prevState,
          lastName: result,
        }));
      }
    } else if (name === "userName") {
      var letterNumber = /^[A-Za-z0-9]*$/;
      if (value.match(letterNumber)) {
        setSignUpData((prevState) => ({
          ...prevState,
          userName: value,
        }));
      }
    } else {
      setSignUpData({
        ...signUpData,
        [evt.target.name]: value,
      });
    }
  };
  // function isValidEmail(email) {
  //   return /\S+@\S+\.\S+/.test(email);
  // }
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState();

  // content in center
  const [contentInCenter, setContentInCenter] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerHeight >= 900) {
        setContentInCenter(true);
      } else {
        setContentInCenter(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendOtp = () => {
    const axios = require("axios");
    let data = JSON.stringify({
      email: signUpData.email,
      otp: signUpData.otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${URL.baseUrl}verifyAcount`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status == true) {
          setMessage(true);
          setMessageText(
            "Your email is verified now. you will be notify via email when admin will authorize you for platfrom."
          );
        } else if (response.data.message == "OTP does not match") {
          setMessage(true);
          setMessageText("OTP does not match");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendAgainOtp = () => {
    const axios = require("axios");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${URL.baseUrl}resendOtp?email=${signUpData.email}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == true) {
          setMessage(true);
          setMessageText("OTP has been resended");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMetaMaskUserEmail = () => {
    if (!signUpData.email.includes("@")) {
      setType("wallet");
    }
  };

  return (
    <div>
      <AuthorizeModal
        message={message}
        setMessage={setMessage}
        messageText={messageText}
      />
      <div className="container-fluid bg-whole p-0">
        <div className="row g-0 overflow-hidden vh-100">
          <div className="col-lg-4 overflow-scroll">
            {Otp == false ? (
              <div
                className={
                  contentInCenter == true
                    ? "authentication-page-content align-items-center p-4 d-flex  min-vh-100"
                    : "authentication-page-content p-4 d-flex min-vh-100"
                }
              >
                <div className="w-100">
                  <div className="row justify-content-center">
                    <div className="col-lg-9">
                      <div>
                        <div className="text-center">
                          <div>
                            {/* <Link
                              href="../dashboard/DashboardHome"
                              className=""
                            > */}
                            <div className="d-flex justify-content-center">
                              <div>
                                <Image
                                  src="/assets/images/kuveer.png"
                                  alt="KuverLogo"
                                  height={22}
                                  width={22}
                                  // className="auth-logo logo-dark mx-auto"
                                />
                              </div>
                              <div>
                                <h5 className="mb-sm-0 ms-1 semibold-large text-white">
                                  KUVER
                                </h5>
                              </div>
                            </div>
                            {/* </Link> */}
                          </div>

                          <h4 className="semibold mt-4 text-white">
                            Register account
                          </h4>
                          <p className="text-muted regular-small">
                            Get your free Kuver account now.
                          </p>
                        </div>

                        <div className="p-2 mt-4">
                          {/* <form className=""> */}
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-user-2-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="username"
                              className="semibold-small text-muted"
                            >
                              First name
                            </label>
                            <input
                              name="firstName"
                              value={signUpData.firstName}
                              onChange={handleChange}
                              // value={firstName}
                              // name="firstName"
                              // onChange={handleFirstName}
                              type="text"
                              className="form-control regular-xsmall text-muted"
                              id="username"
                              placeholder="Enter First name"
                            />
                          </div>
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-user-2-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="username"
                              className="semibold-small text-muted"
                            >
                              Last name
                            </label>
                            <input
                              name="lastName"
                              value={signUpData.lastName}
                              onChange={handleChange}
                              type="text"
                              className="form-control regular-xsmall text-muted"
                              id="username"
                              placeholder="Enter Last name"
                            />
                          </div>
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-mail-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="useremail"
                              className="semibold-small text-muted"
                            >
                              Email / Metamask Address
                            </label>
                            <input
                              name="email"
                              value={signUpData.email}
                              onChange={handleChange}
                              type="email"
                              className="form-control regular-xsmall text-muted"
                              id="useremail"
                              placeholder="Enter email / Metamask Address"
                              onBlur={handleMetaMaskUserEmail}
                            />
                          </div>

                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-lock-2-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="userpassword"
                              className="semibold-small text-muted"
                            >
                              User name
                            </label>
                            <input
                              name="userName"
                              value={signUpData.userName}
                              onChange={handleChange}
                              // name="userName"
                              // value={userName}
                              // onChange={handleUserName}
                              // type=""
                              className="form-control regular-xsmall text-muted"
                              id="userName"
                              placeholder="Enter User name"
                            />
                          </div>
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-currency-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="userpassword"
                              className="semibold-small text-muted"
                            >
                              Expected amount of investment
                            </label>
                            <input
                              name="amount"
                              value={signUpData.amount}
                              onChange={handleChange}
                              type="number"
                              className="form-control regular-xsmall text-muted spine"
                              id="amount"
                              placeholder="Amount in dollars"
                              autoComplete="off"
                              inputMode="decimal"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              onKeyDownCapture={(evt) =>
                                evt.key === "-" && evt.preventDefault()
                              }
                            />
                          </div>

                          {/* <div className="auth-form-group-custom mb-4">
                            <i className="auti-custom-input-icon ri-whatsapp-line text-primary"></i>
                            <label
                              for="userpassword"
                              className="semibold-small text-muted"
                            >
                              Whatsapp number
                            </label>
                            <input
                              name="whatsapp"
                              value={signUpData.whatsapp}
                              onChange={handleChange}
                              type="number"
                              className="form-control regular-xsmall text-muted spine"
                              id="amount"
                              placeholder="Enter Whatsapp Number"
                              autoComplete="off"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              onKeyDownCapture={(evt) =>
                                evt.key === "-" && evt.preventDefault()
                              }
                            />
                          </div> */}
                          {type == "wallet" ? (
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-mail-line auti-custom-input-icon text-primary"></i>
                              <label
                                for="useremail"
                                className="semibold-small text-muted"
                              >
                                Email
                              </label>
                              <input
                                name="metamaskUserEmail"
                                value={signUpData.metamaskUserEmail}
                                onChange={handleChange}
                                type="email"
                                className="form-control regular-xsmall text-muted"
                                id="useremail"
                                placeholder="Enter email"
                                // onBlur={handleMetaMaskUserEmail}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="text-center">
                            {/* <Link href="../onBoarding/SignIn"> */}

                            <button
                              onClick={handleSignUp}
                              className="btn btn-primary w-md waves-effect waves-light regular-small text-white"
                              // type="submit"
                              disabled={
                                !signUpData.userName ||
                                !signUpData.firstName ||
                                !signUpData.email ||
                                !signUpData.lastName ||
                                !signUpData.amount
                                // || !signUpData.whatsapp
                              }
                            >
                              Register
                            </button>

                            {/* </Link> */}
                          </div>

                          <div className="mt-4 text-center">
                            <p className="mb-0 text-muted regular-small">
                              By registering you agree to the Kuver{" "}
                              <a
                                href="#"
                                className="text-primary regular-small"
                              >
                                Terms of Use
                              </a>
                            </p>
                          </div>
                          {/* </form> */}
                        </div>

                        <div className="mt-3 text-center">
                          <p className="regular-small text-muted">
                            Already have an account ?{" "}
                            <Link
                              href="../onBoarding/SignIn"
                              className="regular-small text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
                          {/* <p className="regular-small text-muted">
                          © <script>document.write(new Date().getFullYear())</script>
                          Nazox. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <div className="row justify-content-center">
                    <div className="col-lg-9">
                      <div>
                        <div className="text-center">
                          <Link href="../dashboard/DashboardHome" className="">
                            <div className="d-flex justify-content-center">
                              <div>
                                <Image
                                  src="/assets/images/kuver.png"
                                  alt="kuverLogo"
                                  height={25}
                                  width={22}
                                  className="auth-logo logo-dark mx-auto"
                                />
                              </div>
                              <div>
                                <h5 className="mb-sm-0 ms-1 semibold-large text-white">
                                  KUVER
                                </h5>
                              </div>
                            </div>
                          </Link>

                          <h4 className="semibold-mid mt-4 text-white">
                            Enter OTP
                          </h4>
                          <p className="text-muted regular-small">
                            Enter OTP You have received by Email.
                          </p>
                        </div>
                        {/* {otp == false ? (
                        <div className="p-2 mt-5">
                          <div className="alert alert-success mb-4 regular-small" role="alert">
                            Enter your Email to get otp!
                          </div>
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-mail-line auti-custom-input-icon text-primary"></i>
                            <label for="useremail" className="semibold-small text-muted">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={forgetPasswordData.email}
                              onChange={handleChange}
                              className="form-control regular-small text-muted"
                              id="useremail"
                              placeholder="Enter email"
                            />
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              onClick={submitOtp}
                              className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                              type="submit"
                            >
                              Send OTP
                            </button>
                          </div>
                        </div>
                      ) : ( */}
                        <div className="p-2 mt-5">
                          {/* <form className=""> */}
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-lock-2-line auti-custom-input-icon text-primary"></i>
                            <label
                              for="useremail"
                              className="semibold-small text-muted"
                            >
                              One Time Password
                            </label>
                            <input
                              type="number"
                              name="otp"
                              value={signUpData.otp}
                              onChange={handleChange}
                              className="form-control regular-small text-muted spine"
                              id="amount"
                              placeholder="Enter otp"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              onKeyDownCapture={(evt) =>
                                evt.key === "-" && evt.preventDefault()
                              }
                            />
                          </div>

                          {/* <div class="mb-3 auth-form-group-custom mb-4">
                              <i class="ri-lock-2-line auti-custom-input-icon text-primary"></i>
                              <label for="userpassword" className="semibold-small text-muted">
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                // value={forgetPasswordData.password}
                                // onChange={handleChange}
                                class="form-control text-muted"
                                id="userpassword"
                                placeholder="Enter password"
                              />
                            </div> */}

                          <div className="mt-4 text-center">
                            {/* <Link href="../onBoarding/SignIn"> */}
                            <button
                              onClick={sendOtp}
                              className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                              // type="submit"
                              disabled={!signUpData.otp}
                            >
                              Verify OTP
                            </button>
                            {/* </Link> */}
                          </div>
                          {/* </form> */}
                        </div>
                        {/* )} */}
                        <div classNameNmae=" text-center">
                          <p className="regular-small mt-5 text-center text-muted">
                            Didn't receive OTP?{" "}
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={sendAgainOtp}
                              // href="../onBoarding/SignIn"
                              className="fw-medium text-primary regular-small"
                            >
                              {" "}
                              Send again{" "}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-8">
            <div className="authentication-bg position-relative">
              <div className="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
