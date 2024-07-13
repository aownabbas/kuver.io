import Link from "next/link";
import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LoginAction from "../../redux/actions/LoginAction";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "../../public/assets/path/path";
import Web3 from "web3";
import AuthorizeModal from "../../components/modals/AuthorizeModal";
import SaveStatusAction from "../../redux/actions/SaveStatusAction";
function SignIn() {
  const router = useRouter();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    timezone: "",
  });
  const [userAccount, setUserAccount] = useState("");
  // useEffect(()=>{
  //   if(window.ethereum){
  //     var web3 = new Web3(window.ethereum)
  //     console.log(web3,"web31")
  //     const signedMessage = web3.eth.personal.sign(`Nonce: 517944`,"0x27a0154e00dad3b7452f996ced09bb6e4e3447aa")
  //     console.log(signedMessage,"web3");
  //   }

  // },[userAccount])
  // const signedMessage = web3.eth.personal.sign(`Nonce: ${nonce.nonce}`,accounts[0])
  // console.log(signedMessage, "hlw");
  const dispatch = useDispatch();
  let date = new Date();
  var offsetInHours = date.getTimezoneOffset();

  const params = {
    email: signInData.email,
    password: signInData.password,
    timezone: offsetInHours,
  };
  const handleLogin = () => {
    dispatch(LoginAction(params, LoginSuccess, LoginError));
  };
  const LoginSuccess = (response) => {
    console.log(response, "suv");
    if (response.status == "true") {
      localStorage.setItem("loginData", JSON.stringify(response));
      
      router.push("../dashboard/DashboardHome");
      dispatch(SaveStatusAction("true"))
      // console.log(response,"res");
    } else if (response.message == "No any user registerd with this email") {
      setMessage(true);
      setMessageText("No user registerd with this email");
    } else if (response.message == "You entered wrong password") {
      setMessage(true);
      setMessageText("You entered wrong password");
    } else if (
      response.message ==
      "You are not validated yet, you will be notify by email when you will be validated!"
    ) {
      setMessage(true);
      setMessageText(
        "You are not validated yet, you will be notify by email when you will be validated!"
      );
    }
  };
  const LoginError = (err) => {
    console.log(err);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setSignInData({
      ...signInData,
      [evt.target.name]: value,
    });
  };

  let eth;

  if (typeof window !== "undefined") {
    eth = window.ethereum;
  }

  const connectWallet = async (metamask = eth) => {
    try {
      // check if metamask is installed
      if (!metamask) {
        return alert("please install metamask to proceed");
      }
      // access the account
      const acc = await metamask.request({ method: "eth_requestAccounts" });
      setUserAccount(acc[0]);
      const nonceParams = {
        address: acc[0],
      };
      // handleNonce()
      // if (userAccount !== "") {
      // const config = {
      //   url: `${URL.baseUrl}nonce`,
      //   method: "post",
      //   data: acc[0],
      // };
      const responseNonce = await axios
        .post(`${URL.baseUrl}nonce`, { address: acc[0] })
        // const nonce = responseNonce.data
        // console.log(nonce,"nonce");
        // axios(config)
        .then((res) => {
          console.log(res, "succ");
          if (window.ethereum) {
            var web3 = new Web3(window.ethereum); 
            const signedMessage = web3.eth.personal
              .sign(`Nonce: ${res.data.message}`, acc[0])
              .then((res) => {
                console.log(res);

                const metamaskLoginParam = {
                  address: acc[0],
                  signature: res,
                  timezone: offsetInHours,
                };
                const config = {
                  url: `${URL.baseUrl}verify`,
                  method: "post",
                  data: metamaskLoginParam,
                };
                axios(config)
                  .then((res) => {
                    console.log(res.data, "succ");
                    if (res.data.message == "Successfully logged in") {
                      localStorage.setItem(
                        "loginData",
                        JSON.stringify(res.data)
                      );
                      router.push("../dashboard/DashboardHome");
                      dispatch(SaveStatusAction("true"))
                    } else if (
                      res.data.message ==
                      "You are not validated yet.. check later"
                    ) {
                      setMessage(true);
                      setMessageText("You are not validated yet. check later");
                    } else if (res.data.message == "User does not exist") {
                      setMessage(true);
                      setMessageText("Your account does not exist");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // }
    } catch (error) {
      console.log(error);
      // throw new Error('No ethereum object found')
    }
  };
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState();

  return (
    <div>
      <div class="container-fluid bg-whole p-0">
        <AuthorizeModal
          message={message}
          setMessage={setMessage}
          messageText={messageText}
        />
        <div class="row g-0">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div >
                           {/* <div className="">
                            hlw
                          </div>  */}
                          <div className="text-center">
                            
                          <Link href="https://kuver.io" class="">
                            <div className="d-flex justify-content-center">
                              <div>
                                <Image
                                  src="/assets/images/kuveer.png"
                                  alt="KuverLogo"
                                  height={25}
                                  width={23}
                                  class="auth-logo logo-dark mx-auto"
                                />
                              </div>
                              <div>
                                <h5 class="mb-sm-0 ms-1 semibold-large text-white">
                                  KUVER
                                </h5>
                              </div>
                            </div>
                          </Link>
                          </div>
                        </div>

                        <h4 class="semibold-mid text-white mt-4">
                          Welcome Back !
                        </h4>
                        <p class="text-muted regular-small">
                          Sign in to continue to Kuver.
                        </p>
                      </div>

                      <div class="p-2 mt-5">
                        {/* <form class="" > */}
                        <div class="mb-3 auth-form-group-custom mb-4">
                          <i class="ri-mail-line auti-custom-input-icon text-primary"></i>
                          <label
                            for="useremail"
                            className="semibold-small text-muted"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={signInData.email}
                            onChange={handleChange}
                            class="form-control text-muted"
                            id="useremail"
                            placeholder="Enter email"
                          />
                        </div>

                        <div class="mb-3 auth-form-group-custom mb-4">
                          <i class="ri-lock-2-line auti-custom-input-icon text-primary"></i>
                          <label
                            for="userpassword"
                            className="semibold-small text-muted"
                          >
                            Password
                          </label>
                          <input
                            value={signInData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            class="form-control text-muted"
                            id="userpassword"
                            placeholder="Enter password"
                          />
                        </div>

                        <div class="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input float-start"
                            id="customControlInline"
                            style={{ border:'1px solid #31394e'}}
                          />
                          <label
                            className="form-check-label semibold-small text-muted"
                            for="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div class="mt-4 text-center">
                          <button
                            onClick={handleLogin}
                            className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                            type="submit"
                            disabled={!signInData.email || !signInData.password}
                          >
                            Log In
                          </button>
                        </div>

                        <div class="mt-4 text-center">
                          <button
                            onClick={() => connectWallet()}
                            className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                            type="submit"
                          >
                            LogIn with Metamask
                          </button>
                        </div>

                        <div class="mt-4 text-center">
                          <Link
                            href="../onBoarding/ForgetPassword"
                            className="regular-small text-muted"
                          >
                            <i className="mdi mdi-lock me-1 "></i> Forgot your
                            password?
                          </Link>
                        </div>
                        {/* </form> */}
                      </div>

                      <div class="mt-5 text-center">
                        <p className="regular-small text-muted">
                          Don't have an account ?{" "}
                          <Link
                            href="../onBoarding/SignUp"
                            className="fw-medium text-primary regular-small"
                          >
                            {" "}
                            Register{" "}
                          </Link>{" "}
                        </p>
                        {/* <p className='regular-small text-muted'>
                          © Nazox. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesdesign
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
