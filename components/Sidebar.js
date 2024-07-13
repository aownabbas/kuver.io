import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/router';
function Sidebar({
  //  dashboardStyle, authorizeStyle, adminStyle, userStyle,
  //  showAdminData
 }) {
  const router = useRouter()
  console.log(router.pathname,"path");
  const [showAdminData, setShowAdminData] = useState("");

  useEffect(() => {
    const idUser = JSON.parse(localStorage.getItem("loginData"));
    console.log(idUser,"user");
    if (idUser) {
      setShowAdminData(idUser.data.user.role);
    }
  }, []);
  

  return (
    <div class="vertical-menu" style={{ backgroundColor: "#252b3b" }}>
      <div data-simplebar="init" class="h-100">
        <div class="simplebar-wrapper" style={{ margin: "0px" }}>
          <div class="simplebar-height-auto-observer-wrapper">
            <div class="simplebar-height-auto-observer"></div>
          </div>
          <div class="simplebar-mask">
            <div
              class="simplebar-offset"
              style={{ right: "-16.8px", bottom: "0px" }}
            >
              <div
                class="simplebar-content-wrapper"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div class="simplebar-content" style={{ padding: "0px" }}>
                  {/* <!--- Sidemenu --> */}
                  <div id="sidebar-menu" class="mm-active">
                    {/* <!-- Left Menu Start --> */}
                    <ul class="metismenu list-unstyled mm-show" id="side-menu">
                      <li class="menu-title regular-xsmall text-muted">Menu</li>
                      {/* onClick={handleNavigate} */}
                      <li>
                        <Link
                          href="../dashboard/DashboardHome"
                          class="waves-effect"
                        >
                          {/* <i
                            className={
                              dashboardStyle == true
                                ? "ri-dashboard-line text-white"
                                : "ri-dashboard-line text-muted"
                            }
                          ></i> */}
                          <Image
                            src="/assets/images/icons/blueicons/dashboard.png"
                            width={20}
                            height={20}
                            alt="validated"
                            style={{ marginRight: "5px" }}
                          />
                          {/* <span class="badge rounded-pill bg-success float-end">3</span> */}
                          <span
                            className={
                              router.pathname == "/dashboard/DashboardHome"
                                ? "text-white semibold-small"
                                : "text-muted semibold-small"
                            }
                          >
                            Dashboard
                          </span>
                        </Link>
                      </li>
                      {showAdminData == "user" && (
                        <li>
                          <Link
                            href="../dataTables/AuthorizeUser"
                            class=" waves-effect"
                          >
                            {/* <i class="ri-calendar-2-line text-primary"></i> */}
                            <Image
                              src="/assets/images/icons/blueicons/total bonds sold.png"
                              width={20}
                              height={20}
                              alt="validated"
                              style={{ marginRight: "5px" }}
                            />
                            <span
                              className={
                                router.pathname == "/dataTables/AuthorizeUser"
                                  ? "text-white semibold-small"
                                  : "text-muted semibold-small"
                              }
                            >
                              My K-Bonds
                            </span>
                          </Link>
                        </li>
                        )}
                      {showAdminData == "admin" && (
                        <div>
                          <li class="menu-title regular-xsmall text-muted">
                            admin
                          </li>
                          <li>
                            <Link
                              href="../adminPages/AdminData"
                              class=" waves-effect"
                            >
                              {/* <i className="ri-calendar-2-line text-primary"></i> */}
                              <Image
                                src="/assets/images/icons/blueicons/admin data.png"
                                width={20}
                                height={20}
                                alt="validated"
                                style={{ marginRight: "5px" }}
                              />
                              <span
                                className={
                                  router.pathname == "/adminPages/AdminData"
                                    ? "text-white semibold-small"
                                    : "text-muted semibold-small"
                                }
                              >
                                Admin Data
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="../dataTables/Users"
                              class=" waves-effect"
                            >
                              {/* <i className="ri-calendar-2-line text-primary"></i> */}
                              <Image
                                src="/assets/images/icons/blueicons/users.png"
                                width={20}
                                height={20}
                                alt="validated"
                                style={{ marginRight: "5px" }}
                              />
                              <span
                                className={
                                  router.pathname == "/dataTables/Users"
                                    ? "text-white semibold-small"
                                    : "text-muted semibold-small"
                                }
                              >
                                Users
                              </span>
                            </Link>
                          </li>
                        </div>
                        )}
                    </ul>
                  </div>
                  {/* <!-- Sidebar --> */}
                </div>
              </div>
            </div>
          </div>
          <div
            class="simplebar-placeholder"
            style={{ width: "auto", height: "1135px" }}
          ></div>
        </div>
        <div
          class="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            class="simplebar-scrollbar"
            style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}
          ></div>
        </div>
        <div
          class="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            class="simplebar-scrollbar"
            style={{
              transform: "translate3d(0px, 44px, 0px)",
              display: "block",
              height: "411px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
