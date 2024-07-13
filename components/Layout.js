import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SaveStatusAction from "../redux/actions/SaveStatusAction";
import PageNotFound from "../pages/PageNotFound";
function Layout({
  children,
}) {
  const state = useSelector((state) => state.status.status);
  console.log(state, "state");

  const [showAdminData, setShowAdminData] = useState("");

  const [mystatus, setmyStatus] = useState(null);
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem("loginData"));
    SaveStatusAction();
    if (LoginData) {
      setmyStatus(LoginData.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mystatus]);
  const router = useRouter();
  return (
    <>
      {/* router.pathname != "/" && */}
      {router.pathname != "/onBoarding/SignIn" &&
      router.pathname != "/onBoarding/SignUp" &&
      router.pathname != "/onBoarding/ForgetPassword" ? (
        mystatus == "true" || (state == "true") ? (
          <div id="layout-wrapper" style={{ backgroundColor: "#1d222e" }}>
            <Header showAdminData={showAdminData} />
            {/* header end */}
            <Sidebar showAdminData={showAdminData} />
            <div class="main-content">
              <div class="page-content">
                <div class="container-fluid">
                  {/* <!-- start page title --> */}
                  <div class="row">
                    <div class="col-12">{children}</div>
                  </div>
                </div>

                <Footer />
              </div>
            </div>
          </div>
        ) : router.pathname == "/" || router.pathname == "/dashboard/DashboardHome" && mystatus != "true" ? (children)
        :
         (
          <PageNotFound/>
        )
      )
       : (
        children
      )}
    </>
  );
}

export default Layout;
