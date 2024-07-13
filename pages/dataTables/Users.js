import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

// material ui lib.
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

//
import Checkbox from "@mui/material/Checkbox";
import WebPagination from "../../components/table/WebPagination";
import usePagination from "../../components/table/Pagination";
import { useDispatch } from "react-redux";
import ValidateUserListAction from "../../redux/actions/ValidateUserListAction";
import UserValidAction from "../../redux/actions/ValidateUserAcion";
import AuthorizeModal from "../../components/modals/AuthorizeModal";
import {
  Dropdown,
  Item,
  Toggle,
  Menu,
  Nav,
  Container,
  NavDropdown,
  Navbar,
  Brand,
  Collapse,
  NavItem,
} from "react-bootstrap";
import Image from "next/image";
import UnAuthorizeUserAction from "../../redux/actions/UnAuthorizeUserAction";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import { useRouter } from "next/router";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SearchUsersAction from "../../redux/actions/SearchUsersAction";
import { useMemo } from "react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "first_name",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email / Wallet Adress",
  },
  {
    id: "planing_to_invest",
    numeric: false,
    disablePadding: false,
    label: "Expected amount ($)",
  },
  {
    id: "noArrow",
    numeric: false,
    disablePadding: false,
    label: "User Status",
  },
  {
    id: "notArrow",
    numeric: false,
    disablePadding: false,
    label: "Action",
    hideSortIcon: false,
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "first_name";
const DEFAULT_ROWS_PER_PAGE = 10;
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "noArrow" && headCell.id !== "notArrow" ? (
              <TableSortLabel
                className="text-white"
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <div className="text-truncate float-start small-bold text-white">
                  {headCell.label}
                </div>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <div className=" small-bold text-white px-2">
                {headCell.label}
              </div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function KBondTables() {
  const [usersDataCount, setUsersDataCount] = useState();
  const [usersData, setUsersData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [validUser, setValidUser] = useState("list");
  const [heading, setHeading] = useState();
  const [validText, setValidText] = useState();
  const [status, setStatus] = useState();

  // console.log(window.innerWidth,"width");

  // confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState();
  const [userValidationsData, setUserValidationsData] = useState({
    userId: "",
    userStatus: "",
  });
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState();
  // console.log(userValidationsData, "data");
  const dispatch = useDispatch();

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#1d222e",
            color: "red",
            borderTop: "1px solid white",
          },
        },
      },
    },
  });

  // search
  let [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [searchTableData, setSearchTableData] = useState();
  const [token, setToken] = useState();
  const [limit, setLimit] = useState(7);

  const params = `page=${page}&limit=${limit}&keyword=${validUser}`;
  const searchParams = `string=${filter}&page=${page}&limit=${limit}`;
  console.log(page, "page");
  const router = useRouter();
  useEffect(() => {
    function handleResize() {
      if (window.innerHeight >= 900) {
        setLimit(12);
      } else {
        setLimit(7);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("loginData"));
    if (items) {
      setToken(items.data.token);
      // UnAuthorizeUsers();
      usersList();
      console.log(items.data.token, "token");
      dispatch(
        ValidateUserListAction(
          params,
          items.data.token,
          validUserSuccess,
          validUserError
        )
      );
      dispatch(
        SearchUsersAction(
          searchParams,
          items.data.token,
          searchUserDataSuccess,
          searchUserDataError
        )
      );
    } else {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page, limit]);
  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem("loginData"));
    if (items) {
      UnAuthorizeUsers();
    }
  },[validUser])

  const [searchUserData, setSearchUserData] = useState({
    userData: [],
    userdataCount: "",
  });

  const searchUserDataSuccess = (res) => {
    setSearchUserData({
      ...searchUserData,
      userData: res.data.items,
      userdataCount: res.data.totalItems,
    });
  };
  const searchUserDataError = (err) => {
    console.log(err, "err");
  };

  const usersList = () => {
    dispatch(
      ValidateUserListAction(params, token, validUserSuccess, validUserError)
    );
    console.log(token, "token");
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const validUserSuccess = (res) => {
    // console.log(res,"users");
    setUsersDataCount(res.data.totalItems);
    setUsersData(res.data.items);
    console.log(res.status, "success");
    setStatus(res.status);
  };

  const validUserError = (err) => {
    console.log(err, "err");
  };

  const userValidation = (id) => {
    const item = JSON.parse(localStorage.getItem("loginData"));
    if (userValidationsData.userStatus == "not validated") {
      const parms = { user_id: userValidationsData.userId };
      dispatch(UserValidAction(parms, token, UserSuccess, UserError));
    } else if (userValidationsData.userStatus == "unAuthorized") {
      const parms = { user_id: userValidationsData.userId };
      dispatch(UserValidAction(parms, token, UserSuccess, UserError));
    }
    // const parms = { user_id: id };
    // dispatch(UserValidAction(parms, token, UserSuccess, UserError));
  };

  const UserSuccess = (res) => {
    console.log(res, "respo");
    setValidModal(true);
    setHeading("Authorization");
    setValidText("User authorized successfully");
    // setModalOpen(true);
  };

  const UserError = (err) => {
    console.log(err, "errii");
  };

  const UnAuthorizeUsers = () => {
    const items = JSON.parse(localStorage.getItem("loginData"));
    setToken(items.data.token);
    if (userValidationsData.userStatus == "validated") {
      var params = JSON.stringify({
        user_id: userValidationsData.userId,
      });
      dispatch(
        UnAuthorizeUserAction(
          params,
          token,
          UnauthorizeSuccess,
          UnauthorizeError
        )
      );
    }
  };
  const UnauthorizeSuccess = (res) => {
    if(res.status == true){
      setModalOpened(true);
      setHeading("Un-Authorization");
      setValidText("User un-authorized successfully");
      console.log(res, "UnAuthorize");
    }
  };
  const UnauthorizeError = (err) => {
    console.log(err, "purchazed error");
  };

  const NewListForValidatedUsers=()=>{
    const items = JSON.parse(localStorage.getItem("loginData"));
    if (items) {
      dispatch(
        ValidateUserListAction(
          params,
          items.data.token,
          validUserSuccess,
          validUserError
        )
      );
      dispatch(
        SearchUsersAction(
          searchParams,
          items.data.token,
          searchUserDataSuccess,
          searchUserDataError
        )
      );
  }
  }
  const PER_PAGE = limit;
  if (filter == "") {
    var count = Math.ceil(usersDataCount / PER_PAGE);
  } else {
    var count = Math.ceil(searchUserData.userdataCount / PER_PAGE);
  }
  const tableData = usePagination(usersData, usersDataCount, PER_PAGE);
  const userDataList = usePagination(
    searchUserData.userdataCount,
    searchUserData.userData,
    PER_PAGE
  );
  // console.log(tableData.currentData(), "hle");

  const handlePagination = (e, p) => {
    setPage(p);
    tableData.jump(p);
    userDataList.jump(p);
  };

  const handleAuthorize1 = (id) => {
    console.log(id, "idddddddi");
    userValidation(id);
    setModalOpen(true);
    setKBondData({ ...kBondData, authBtn: false });
  };

  const handleAuthorize = (id, status) => {
    // alert("hlew",status)
    console.log(status,"abcc");
    if (status == "not validated") {
      setUserValidationsData({
        ...userValidationsData,
        userId: id,
        userStatus: status,
      });
      setConfirmationModal(true);
      setConfirmModalText("Do you want to Authorize this user ?");
    } else if (status == "unAuthorized") {
      setUserValidationsData({
        ...userValidationsData,
        userId: id,
        userStatus: status,
      });
      setConfirmationModal(true);
      setConfirmModalText("Do you want to Authorize this user again ?");
    }
    else if(status=="Email not verified yet") {
      setMessage(true);
      setMessageText("Email not verified yet");
    }
  };

  const handleUnAuthorize = (id, status) => {
    console.log(status,"statssss");
    if (status == "validated") {
      setUserValidationsData({
        ...userValidationsData,
        userId: id,
        userStatus: status,
      });
      setConfirmationModal(true);
      setConfirmModalText("Do you want to Unauthorize this user ?");
    } else {
      setMessage(true);
      setMessageText("Already UnAuthorized");
    }
  };

  const [userStyle, setUserStyle] = useState(true);

  // User validate modal
  const [validModal, setValidModal] = useState(false);
  const handleClose = () => {
    setValidModal(false);
    usersList();
  };
console.log(validModal,"modal");
  const handleAscending = () => {
    const strAscending = [...usersData].sort((a, b) =>
      a.first_name > b.first_name ? 1 : -1
    );
    setUsersData(strAscending);
    console.log(strAscending, "Ascending");
  };

  // sort table code
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const visibleRows = useMemo(
    () => stableSort(usersData, getComparator(order, orderBy)),
// eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage]
  );
  const sortedSearch = useMemo(
    () => stableSort(searchUserData.userData, getComparator(order, orderBy)),
// eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage]
  );
  useEffect(() => {
    setUsersData(visibleRows);
    setSearchUserData({ ...searchUserData, userData: sortedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleRows,sortedSearch]);
  // console.log(orderBy, "orderby");
  // console.log(visibleRows, "sorted");
  // userStyle={userStyle}
  return (
    // <Layout >
    <>
      <AuthorizeModal
        validModal={validModal}
        setValidModal={setValidModal}
        handleClose={handleClose}
        src="/assets/images/user.png"
        heading={heading}
        text={validText}
        confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal}
        confirmModalText={confirmModalText}
        UnAuthorizeUsersActions={UnAuthorizeUsers}
        validateUser={userValidation}
        userStatus={userValidationsData.userStatus}
        message={message}
        setMessage={setMessage}
        messageText={messageText}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        NewListForValidatedUsers={NewListForValidatedUsers}
      />

      <div
        className="col-12"
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
          overflowY: "auto",
        }}
      >
        {/* <div>L</div> */}
        {/* {loading1 == true && !chGiist ? (
          <TableLoaders height="75%" />
        ) : (
          <> */}
        {status == true ? (
          <TableContainer
            component={Paper}
            checkboxSelection
            style={{
              borderRadius: "15px",
              height: "84%",
              backgroundColor: "#252b3b",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            {/* <div className="semibold text-white me-sm-4 mt-3">Unauthorize Users List</div>
          <div className="d-flex">
            <div className="col-2 text-muted me-sm-4 mt-2 regular-xsmall">Show 10 entries</div>
            <div className="col-2 offset-7">
              <div className="d-flex">
                <div className='me-sm-1 regular-xsmall text-muted mt-1' >Search:</div>
                <div className="ml-2">
                  <input className="ml-2 text-muted regular-xsmall" value={filter} onChange={handleSearch} placeholder="Search..." style={{backgroundColor: 'black',border:"none",padding:"3px"}}/>
                </div>
              </div>
            </div>
          </div> */}

            <div className="d-flex mt-3 px-3">
              <div className="col-8">
                <div className="semibold text-white ">
                  Users List for Authorization
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <NavDropdown
                    title={
                      <>
                        {/* <span className="text-white d-lg-inline d-none">Hi:wave: </span> */}
                        {/* <Image
                          src="/assets/images/setting-4.svg"
                          width={20}
                          height={20}
                          alt="dropdown icon"
                        /> */}
                        <i className="mdi mdi-dots-vertical text-white"></i>
                      </>
                    }
                    id="basic-nav-dropdown headerUserName"
                    className="extrabold text-white ms-1 d-inline-flex text-capitalize p-0"
                  >
                    <NavDropdown.Item
                      className="px-0 m-0 py-0 dropdown-item"
                      style={{
                        backgroundColor: "white",
                        // border: '1px solid gray',
                        shadow: "2px 0px 0px 3px 0px rgba(0,0,0,0.75)",
                        textAlign: "left",
                      }}
                    >
                      <div
                        className="ps-3 py-2 dropdown-text regular-small"
                        onClick={() => {
                          setValidUser("list");
                          usersList();
                        }}
                      >
                        All Users
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="px-0 m-0 py-0 dropdown-item "
                      style={{
                        backgroundColor: "white",
                        // border: '1px solid gray',
                        shadow: "2px 0px 0px 3px 0px rgba(0,0,0,0.75)",
                        textAlign: "left",
                      }}
                    >
                      <div
                        className="ps-3 py-2 dropdown-text regular-small"
                        onClick={() => {
                          setValidUser("validated");
                          usersList();
                        }}
                      >
                        Authorized Users
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="px-0 m-0 py-0 dropdown-item "
                      style={{
                        backgroundColor: "white",
                        // border: '1px solid gray',
                        shadow: "2px 0px 0px 3px 0px rgba(0,0,0,0.75)",
                        textAlign: "left",
                      }}
                    >
                      <div
                        className="ps-3 py-2 dropdown-text regular-small"
                        onClick={() => {
                          setValidUser("not validated");
                          usersList;
                        }}
                      >
                        Pending Users
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            </div>
            <div className="row px-3 mt-3">
              <div className="col-md-6">
                <label
                  className="d-inline-flex align-items-center  semibold-small text-muted"
                  style={{ marginRight: "0.5rem" }}
                >
                  {" "}
                  Show{" "}
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(e.target.value);
                    }}
                    className=" custom-selected custom-select-sm ms-2 text-muted px-2"
                    id="__BVID__167"
                    style={{
                      background: "#2b3244 ",
                      border: "1px solid #31394e",
                      outline: "none",
                      height: "30px",
                      width: "50px",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="7">7</option>
                    <option value="12">12</option>
                    <option value="27">27</option>
                    <option value="52">52</option>
                  </select>{" "}
                  entries{" "}
                </label>
              </div>
              <div className="col-md-6">
                <div className="float-end ms-2">
                  <div className="ml-2">
                    <label className="text-muted px-2">Search :</label>
                    <input
                      className="ml-2 text-muted regular-xsmall bg-main "
                      value={filter}
                      onChange={handleSearch}
                      // placeholder="Search..."
                      style={{
                        backgroundColor: "#2B3244",
                        border: "1px solid #31394E",
                        padding: "3px",
                        outline: "none",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Table
              sx={{ minWidth: 500 }}
              style={{
                minWidth: 650,
                borderCollapse: "separate",
                borderSpacing: "0px 12px",
                paddingLeft: "20px",
                backgroundColor: "#252b3b",
                paddingRight: "20px",
                borderRadius: "0px",
              }}
              aria-label="custom pagination table"
              className="col-12 "
            >
              {/* table heading */}
              {/* <TableHead style={{ cursor: "pointer" }}>
                <TableRow>
                  <TableCell style={{ width: 160 }}>
                    <div className="d-flex">
                      <div className="small-bold text-muted ">First Name</div>
                      <div className="ms-1">
                      </div>
                    </div>
                  </TableCell>

                  <TableCell style={{ width: 160 }}>
                    <div className="small-bold text-muted ">Last Name</div>
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <div className="small-bold text-muted ">
                      Email / Wallet Adress
                    </div>
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <div className="small-bold text-muted ">
                      Expected amount $
                    </div>
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <div className="small-bold text-muted ">User Status</div>
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <div className="small-bold text-muted ">Action</div>
                  </TableCell>
                </TableRow>
              </TableHead> */}
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={usersData.length}
              />
              {filter == ""
                ? usersDataCount !== 0 &&
                  usersData?.map((row, index) => (
                    // (isItemSelected = isSelected(row.id)),
                    // (labelId = `enhanced-table-checkbox-${index}`),
                    <TableBody key={index}>
                      <ThemeProvider theme={theme}>
                        <TableRow
                          style={{ borderBottom: "10px solid red" }}
                          // style={{padding:"20px"}}
                          // hover
                          // onClick={(event) => {
                          //   handleClick(event, row.id);
                          // }}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          // key={row.id}
                          // selected={isItemSelected}
                        >
                          <TableCell component="th" scope="row" className="p-0">
                            <label className="w-100 h-100 p-1">
                              <div className="row">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xsmall text-white">
                                  {row.first_name}
                                  {/* first_name = row.first_name.substring(0, 7) */}
                                  <Tooltip
                                    // title={row.first_name}
                                    placement="top"
                                  >
                                    <span className="regular-small text-muted">
                                      {/* {
                                (first_name =
                                  row.first_name.substring(0, 11) + (row.first_name.length > 10 ? '...' : ''))
                              } */}
                                    </span>
                                  </Tooltip>
                                </div>
                              </div>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label className="w-100 h-100 p-1 regular-xsmall text-white">
                              {row.last_name}
                              <Tooltip
                                // title={row.last_name}
                                placement="top"
                              >
                                <span className="">
                                  {/* {(last_name = row.last_name.substring(0, 11) + (row.last_name.length > 10 ? '...' : ''))} */}
                                </span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label
                              className=" h-100 p-1 regular-xsmall text-white text-truncate "
                              style={{ width: "200px" }}
                            >
                              {row.email}
                              <Tooltip placement="top">
                                <span className="regular-small text-muted"></span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label
                              className=" h-100 p-1 regular-xsmall text-white text-truncate "
                              style={{ width: "200px" }}
                            >
                              {row.planing_to_invest}
                              <Tooltip placement="top">
                                <span className="regular-small text-muted"></span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          {/* <TableCell className="p-0">
                          <label className="w-100 h-100 p-1 regular-xsmall regular-small text-muted ">
                            {row.return}
                          </label>
                        </TableCell> */}
                          {/* <TableCell
                          className="p-0"
                          style={{
                            borderTopRightRadius: '13px',
                            borderBottomRightRadius: '13px',
                          }}
                        >
                          <label className="w-100 h-100 p-1 regular-small text-muted ">
                            {row.date}
                          </label>
                        </TableCell> */}
                          <TableCell className="p-0">
                            <label className="w-100 h-100 p-1 regular-xsmall regular-small text-muted ">
                              {row.validation_status == "not validated" ? (
                                <button
                                  type="button"
                                  className="btn px-1 stackbtn regular-xxsmall"
                                  style={{
                                    // color: "#1cbb8c",
                                    color: "#fcb92c",
                                    backgroundColor: "rgba(252,185,44,.18",
                                    cursor: "default",
                                  }}
                                >
                                  Pending
                                </button>
                              ) : row.validation_status == "validated" ? (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#1cbb8c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  Authorized
                                </button>
                              )
                              : row.validation_status == "Email not verified yet" ? (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#1cbb8c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  Otp not Verified
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#fcb92c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  UnAuthorized
                                </button>
                              )}
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label className="w-100 h-100 ">
                              <div>
                                {row.validation_status == "validated" ? (
                                  <Image
                                    src="/assets/images/icons/greenicons/authorized.png"
                                    width={30}
                                    height={30}
                                    alt="validated"
                                    onClick={() => {
                                      handleUnAuthorize(
                                        row.id,
                                        row.validation_status
                                      );
                                    }}
                                  />
                                ) : (
                                  <Image
                                    src="/assets/images/icons/yellowIcons/unauthorizedUser.png"
                                    width={30}
                                    height={30}
                                    alt="validated"
                                    onClick={() => {console.log(row,"rowww");
                                      handleAuthorize(
                                        row.id,
                                        row.validation_status
                                      );
                                    }}
                                  />
                                )}
                              </div>
                            </label>
                          </TableCell>
                        </TableRow>
                      </ThemeProvider>
                    </TableBody>
                  ))
                : searchUserData.userdataCount !== 0 &&
                  searchUserData.userData?.map((row, index) => (
                    // (isItemSelected = isSelected(row.id)),
                    // (labelId = `enhanced-table-checkbox-${index}`),
                    <TableBody key={index}>
                      <ThemeProvider theme={theme}>
                        <TableRow
                          // style={{padding:"20px"}}
                          hover
                          // onClick={(event) => {
                          //   handleClick(event, row.id);
                          // }}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          // key={row.id}
                          // selected={isItemSelected}
                        >
                          <TableCell component="th" scope="row" className="p-0">
                            <label className="w-100 h-100 p-1">
                              <div className="row">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xsmall text-white">
                                  {row.first_name}
                                  {/* first_name = row.first_name.substring(0, 7) */}
                                  <Tooltip
                                    // title={row.first_name}
                                    placement="top"
                                  >
                                    <span className="regular-small text-muted">
                                      {/* {
                                (first_name =
                                  row.first_name.substring(0, 11) + (row.first_name.length > 10 ? '...' : ''))
                              } */}
                                    </span>
                                  </Tooltip>
                                </div>
                              </div>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label className="w-100 h-100 p-1 regular-xsmall text-white">
                              {row.last_name}
                              <Tooltip
                                // title={row.last_name}
                                placement="top"
                              >
                                <span className="">
                                  {/* {(last_name = row.last_name.substring(0, 11) + (row.last_name.length > 10 ? '...' : ''))} */}
                                </span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label
                              className=" h-100 p-1 regular-xsmall text-white text-truncate"
                              style={{ width: "100px" }}
                            >
                              {row.email}
                              <Tooltip
                                // title={row.email}
                                placement="top"
                              >
                                <span className="regular-small text-muted">
                                  {/* {(email = row.email.substring(0, 11) + (row.email.length > 10 ? '...' : ''))} */}
                                </span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label
                              className=" h-100 p-1 regular-xsmall text-white text-truncate "
                              style={{ width: "200px" }}
                            >
                              {row.planing_to_invest}
                              <Tooltip placement="top">
                                <span className="regular-small text-muted"></span>
                              </Tooltip>
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label className="w-100 h-100 p-1 regular-xsmall regular-small text-muted ">
                              {row.validation_status == "not validated" ? (
                                <button
                                  type="button"
                                  className="btn px-1 stackbtn regular-xxsmall"
                                  style={{
                                    // color: "#1cbb8c",
                                    color: "#fcb92c",
                                    backgroundColor: "rgba(252,185,44,.18",
                                    cursor: "default",
                                  }}
                                >
                                  Pending
                                </button>
                              ) : row.validation_status == "validated" ? (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#1cbb8c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  Authorized
                                </button>
                              )
                              : row.validation_status == "Email not verified yet" ? (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#1cbb8c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  Otp not Verified
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className="btn  px-1 stackbtn regular-xxsmall"
                                  style={{
                                    color: "#fcb92c",
                                    // backgroundColor: "rgba(252,185,44,.18",
                                    backgroundColor: "rgba(28,187,140,.18)",
                                    cursor: "default",
                                  }}
                                >
                                  UnAuthorized
                                </button>
                              )}
                            </label>
                          </TableCell>
                          <TableCell className="p-0">
                            <label className="w-100 h-100 ">
                              <div>
                                {row.validation_status == "validated" ? (
                                  <Image
                                    src="/assets/images/icons/greenicons/authorized.png"
                                    width={30}
                                    height={30}
                                    alt="validated"
                                    onClick={() => {
                                      handleUnAuthorize(
                                        row.id,
                                        row.validation_status
                                      );
                                    }}
                                  />
                                ) : (
                                  <Image
                                    src="/assets/images/icons/yellowIcons/unauthorizedUser.png"
                                    width={30}
                                    height={30}
                                    alt="validated"
                                    onClick={() => {
                                      handleAuthorize(
                                        row.id,
                                        row.validation_status
                                      );
                                    }}
                                  />
                                )}
                              </div>
                            </label>
                          </TableCell>
                        </TableRow>
                      </ThemeProvider>
                    </TableBody>
                  ))}
            </Table>
            <div className="float-end d-flex mb-3">
              <WebPagination
                handleChange={handlePagination}
                count={count}
                page={page}
                size="small"
                shape="circular"
                color="primary"
              />
            </div>
          </TableContainer>
        ) : (
          <SkeletonLoader height={470} width="100%" />
        )}
      </div>
      </>
  );
}

export default KBondTables;
