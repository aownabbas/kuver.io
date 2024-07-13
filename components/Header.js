import React from 'react'
import { useEffect,useState,useRef } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Link from 'next/link';
import Image from 'next/image';
import MenuList from "@mui/material/MenuList";
import { useDispatch } from 'react-redux';
import SaveStatusAction from '../redux/actions/SaveStatusAction';
function Header() {

    // notification dropdown
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [layoutData, setLayoutData] = useState({
    userName: "",
  });

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  useEffect(() => {
    console.log("Header");
    const LoginData = JSON.parse(localStorage.getItem("loginData"));
    if (LoginData) {
      setLayoutData({ layoutData, userName: LoginData.data.user.username });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
const dispatch=useDispatch()
  const handleLogout = async () => {
    await localStorage.removeItem("loginData");
    dispatch(SaveStatusAction(""))
  };


  // login & logout
  const [open1, setOpen1] = useState(false);
  const anchorRef1 = useRef(null);

  const handleToggle1 = () => {
    setOpen1((prevOpen) => !prevOpen);
  };

  const handleClose1 = (event) => {
    if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
      return;
    }

    setOpen1(false);
  };

  function handleListKeyDown1(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1(false);
    } else if (event.key === "Escape") {
      setOpen1(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen1 = useRef(open1);
  useEffect(() => {
    if (prevOpen1.current === true && open1 === false) {
      anchorRef1.current.focus();
    }

    prevOpen1.current = open1;
  }, [open1]);

    const toggleFullSceen = () => {
        console.log(document.body,"body");
        if (document.body && !document.fullscreenElement) {
          document.body.requestFullscreen();
        }
        // else if (document.body && !document.mozFullScreenElement) {
        //   document.body.requestFullscreen();
        // } 
        // else if (document.body && !document.msFullscreenElement) {
        //   document.body.requestFullscreen();
        // }
        else {
            document.exitFullscreen();
        }
      };

  return (
    <header id="page-topbar">
    <div class="navbar-header" style={{ backgroundColor: "#252b3b" }}>
      {/* <div class="d-flex"> */}
      {/* <!-- LOGO --> */}
      <div class="navbar-brand-box">
        <Link href="../dashboard/DashboardHome" class="logo logo-dark">
          <div className="d-flex">
            <div class="">
              <Image
                src="/assets/images/kuveer.png"
                alt="logo-dark"
                height={40}
                width={35}
              />
            </div>
            <div className="bold text-white">KUVER</div>
          </div>
          {/* </a> */}
        </Link>
      </div>

      <div class="d-flex">
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
          >
            <i
              class="ri-fullscreen-line text-muted"
              onClick={toggleFullSceen
                // handle.active == false ? handle.enter : handle.exit
              }
            ></i>
          </button>
        </div>

        <div class="dropdown d-inline-block user-dropdown">
          <Button
            className="btn header-item waves-effect"
            ref={anchorRef1}
            id="composition-button"
            aria-controls={open1 ? "composition-menu" : undefined}
            aria-expanded={open1 ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle1}
          >
            <Image
              class="rounded-circle header-profile-user"
              src="/assets/images/users/user (1).png"
              alt="Header Avatar"
              height={40}
              width={40}
            />
            <span
              class="d-none d-xl-inline-block ms-1 text-muted"
              style={{ fontWeight: "bold" }}
            >
              {layoutData.userName}
            </span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block text-muted"></i>
          </Button>
          <Popper
            open={open1}
            anchorEl={anchorRef1.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start"
                      ? "left top"
                      : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose1}>
                    <MenuList
                      autoFocusItem={open1}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown1}
                    >
                      <Link
                        class="dropdown-item text-danger"
                        href="../onBoarding/SignIn"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        <i class="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
                        Logout
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header