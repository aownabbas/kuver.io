import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { URL } from '../../public/assets/path/path';
import ChangePasswordAction from '../../redux/actions/ChangePasswordAction';
import AuthorizeModal from '../../components/modals/AuthorizeModal';

function ForgetPassword() {
  const [otp, setOtp] = useState(false);
  const dispatch = useDispatch();
  const [forgetPasswordData, setForgetPasswordData] = useState({
    email: '',
    password: '',
    recievedOtp: '',
  });
  const param = `email=${forgetPasswordData.email}`;
  console.log(forgetPasswordData, 'hlw');
  const submitOtp = () => {
    var axios = require('axios');
    var config = {
      method: 'post',
      url: `${URL.baseUrl}forgetpassword?${param}`,
      // data: param,
    };
    axios(config)
      .then((response) => {
        console.log(response,'done');
        if (response.data.status == true) {
          setOtp(!otp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changePasswordParams = {
    email: forgetPasswordData.email,
    password: forgetPasswordData.password,
    otp: forgetPasswordData.recievedOtp,
  };
  const changePassword = () => {
    dispatch(ChangePasswordAction(changePasswordParams, changePasswordSuccess, changePasswordError));
  };

  const changePasswordSuccess = (res) => {
      if(res.messge== "User password changed successfully!"){
        setMessage(true)
        setMessageText("your password changed successfully!")
      }
      else if(res.message== "You entered wrong OTP"){
        setMessage(true)
        setMessageText("You entered wrong OTP")
      }
    console.log(res, 'succ');
  };

  const changePasswordError = (err) => {
    console.log(err, 'err');
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setForgetPasswordData({
      ...forgetPasswordData,
      [evt.target.name]: value,
    });
  };
  const [message,setMessage] = useState(false)
  const [messageText,setMessageText] = useState()

  return (
    <div>
      <AuthorizeModal message={message} setMessage={setMessage} messageText={messageText} />

      <div className="container-fluid bg-whole p-0">
        <div className="row g-0">
          <div className="col-lg-4">
            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div className="w-100">
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div>
                      <div className="text-center">
                        {/* <Link href="../dashboard/DashboardHome" className=""> */}
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
                              <h5 className="mb-sm-0 ms-1 semibold-large text-white">KUVER</h5>
                            </div>
                          </div>
                        {/* </Link> */}

                        <h4 className="semibold-mid mt-4 text-white">Reset Password</h4>
                        <p className="text-muted regular-small">Reset your password to Kuver.</p>
                      </div>
                      {otp == false ? (
                        <div className="p-2 mt-5">
                          <div className="alert alert-success mb-4 regular-small" role="alert">
                            Enter your Email to get otp!
                          </div>
                          {/* <form className=""> */}
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
                            {/* <Link href="../onBoarding/SignIn"> */}
                            <button
                              onClick={submitOtp}
                              className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                              type="submit"
                              disabled={!forgetPasswordData.email}
                            >
                              Send OTP
                            </button>
                            {/* </Link> */}
                          </div>
                          {/* </form> */}
                        </div>
                      ) : (
                        <div className="p-2 mt-5">
                          {/* <form className=""> */}
                          <div className="auth-form-group-custom mb-4">
                            <i className="ri-mail-line auti-custom-input-icon text-primary"></i>
                            <label for="useremail" className="semibold-small text-muted">
                              Otp
                            </label>
                            <input
                              type="number"
                              name="recievedOtp"
                              value={forgetPasswordData.recievedOtp}
                              onChange={handleChange}
                              className="form-control regular-small text-muted spine"
                              id="useremail"
                              placeholder="Enter otp received by email"
                              onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                              onKeyDownCapture={ (evt) => evt.key === '-' && evt.preventDefault() }
                            />
                          </div>

                          <div class="mb-3 auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon text-primary"></i>
                            <label for="userpassword" className="semibold-small text-muted">
                              Password
                            </label>
                            <input
                              type="text"
                              name="password"
                              value={forgetPasswordData.password}
                              onChange={handleChange}
                              class="form-control text-muted"
                              id="userpassword"
                              placeholder="Enter new password"
                            />
                          </div>

                          <div className="mt-4 text-center">
                            {/* <Link href="../onBoarding/SignIn"> */}
                            <button
                              onClick={changePassword}
                              className="btn btn-primary w-md waves-effect waves-light text-white regular-small"
                              // type="submit"
                              disabled={!forgetPasswordData.recievedOtp || !forgetPasswordData.password}
                            >
                              Change Password
                            </button>
                            {/* </Link> */}
                          </div>
                          {/* </form> */}
                        </div>
                      )}
                      <div classNameNmae=" text-center">
                        <p className="regular-small mt-5 text-center text-muted">
                          Don't have an account ?{' '}
                          <Link href="../onBoarding/SignIn" className="fw-medium text-primary regular-small">
                            {' '}
                            Log in{' '}
                          </Link>{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="authentication-bg">
              <div className="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
