import React, { useCallback, useEffect, useMemo, useState } from "react";
// import Layout from '../../components/Layout';
import Moment from "react-moment";

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

import WebPagination from "../../components/table/WebPagination";
import usePagination from "../../components/table/Pagination";
import BondDataCard from "../../components/card/BondDataCard";
// modal imports
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import PurchazedBondsAction from "../../redux/actions/PurchazedBondsAction";
import StackedListAction from "../../redux/actions/StackedListAction";
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
import StatsAction from "../../redux/actions/StatsAction";
import { forwardRef } from "react";
import AuthorizeModal from "../../components/modals/AuthorizeModal";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import { useRouter } from "next/router";
import SearchBondsAction from "../../redux/actions/SearchBondsAction";
import CopyAddressModal from "../../components/modals/CopyAddressModal";

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
  width: 400,
  bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid currentColor",
  borderRadius: "12px",
  height: "250px",
  padding: "16px 32px 24px 32px",
});

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
    id: "sr_no",
    numeric: false,
    disablePadding: true,
    label: "Serial Number",
  },
  {
    id: "value",
    numeric: false,
    disablePadding: false,
    label: "Value ($)",
  },
  {
    id: "k_bond_type",
    numeric: false,
    disablePadding: false,
    label: "Bond Type",
  },
  {
    id: "Date_purchase",
    numeric: false,
    disablePadding: false,
    label: "Date Purchase",
  },
  {
    id: "wallet",
    numeric: false,
    disablePadding: false,
    label: "Wallet",
  },
  {
    id: "no_of_months",
    numeric: false,
    disablePadding: false,
    label: "Stacking Period",
  },
  {
    id: "remaining_days",
    numeric: false,
    disablePadding: false,
    label: "Time Left",
  },
  {
    id: "exptected_return",
    numeric: false,
    disablePadding: false,
    label: "Expected Return ($)",
  },
  {
    id: "noArrow",
    numeric: false,
    disablePadding: false,
    label: "Validation",
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
const DEFAULT_ORDER_BY = "sr_no";
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
                className="text-muted"
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <div className="text-truncate float-start semibold-mid-small text-white">
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
              <div className="text-truncate float-start semibold-mid-small text-white px-2">
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

function AdminData() {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#1d222e",
            color: "red",
            border: "1px solid black",
          },
        },
      },
    },
  });

  const [validModal, setValidModal] = useState(false);

  // search
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);

  // confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState();

  useEffect(() => {
    function handleResize() {
      if (window.innerHeight >= 900) {
        setLimit(7);
      } else {
        setLimit(5);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleSearch = (event) => {
    setFilter(event.target.value);
  };
  const router = useRouter();
  let [page, setPage] = useState(1);
  const [validUser, setValidUser] = useState("list");
  const [token, setToken] = useState();
  const [searchBondsData, setSearchBondsData] = useState({
    bondsData: [],
    bondsdataCount: "",
  });
  const bondsDataParams = `wallet=${filter}&page=${page}&limit=${limit}`;
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("loginData"));
    if (items) {
      adminDataTable();
      dispatch(StatsAction(items.data.token, statsSuccess, statsError));
      dispatch(
        SearchBondsAction(
          bondsDataParams,
          items.data.token,
          searchBondsDataSuccess,
          searchBondsDataError
        )
      );
    } else {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, validUser, limit, filter]);

  const searchBondsDataSuccess = (res) => {
    console.log(res, "response");
    setSearchBondsData({
      ...searchBondsData,
      bondsData: res.data.items,
      bondsdataCount: res.data.totalItems,
    });
  };
  const searchBondsDataError = (err) => {
    console.log(err, "error");
  };
  const [adminData, setAdminData] = useState({
    status: "",
  });
  const [bondDataCount, setBondDataCount] = useState();
  const [bondsData, setBondsData] = useState([]);
  console.log(bondsData, "status");
  const [purchazeBond, setPurchazeBond] = useState([]);
  const [statsInvestment, setStatsInvestment] = useState();
  const [statsInvestmentReturn, setStatsInvestmentReturn] = useState();
  const [statsReturn, setStatsReturn] = useState();
  const [previousReturn, setPreviousReturn] = useState();
  const [serialNumber, setSerialNumber] = useState();

  const [statsBond, setStatsBond] = useState();
  const [previousBond, setPreviousBond] = useState();

  const adminDataTable = () => {
    // alert("hlw")
    const items = JSON.parse(localStorage.getItem("loginData"));
    // console.log(items.data.token, "logindata");
    setToken(items.data.token);
    var params = JSON.stringify({
      page: page,
      limit: limit,
      keyword: validUser,
      serial_number: serialNumber,
    });
    dispatch(
      PurchazedBondsAction(
        params,
        items.data.token,
        purchazedSuccess,
        purchazedError
      )
    );
  };
  const handleUnAuthorize = (serialNo) => {
    setSerialNumber(serialNo);
    setConfirmationModal(true);
    setConfirmModalText("Do you want to Validate this k-Bond ?");
    // adminDataTable1(serialNo, "validate");
  };
  const adminDataTable1 = (serial, validate) => {
    const items = JSON.parse(localStorage.getItem("loginData"));
    setToken(items.data.token);
    var params = JSON.stringify({
      page: page,
      limit: 5,
      keyword: "validate",
      serial_number: serialNumber,
    });
    dispatch(
      PurchazedBondsAction(
        params,
        items.data.token,
        validateSuccess,
        validateError
      )
    );
  };

  const validateSuccess = (res) => {
    // setPurchazeBond(res.all_purchazed_bonds);
    setValidModal(true);
    console.log(res, "validateSuccess");
  };
  const validateError = (err) => {
    console.log(err, "validateError");
  };

  const purchazedSuccess = (res) => {
    setPurchazeBond(res.all_purchazed_bonds);
    setBondsData(res.all_purchazed_bonds.items);
    setBondDataCount(res.all_purchazed_bonds.totalItems);
  };
  const purchazedError = (err) => {
    console.log(err, "purchazed error");
  };

  const statsSuccess = (res) => {
    setStatsInvestment(res.total_investment[0].price);
    setStatsInvestmentReturn(res.total_investment[1].prev_month);
    setStatsReturn(res.total_return[0].totalreturn);
    console.log(res.total_return[0].totalreturn, "average");
    setPreviousReturn(res.total_return[1].pre_return);
    setStatsBond(res.total_stacked_bonds[0].stack_bond);
    setPreviousBond(res.total_stacked_bonds[1].prev_per);
    console.log(res, "stats");
    setAdminData({ ...adminData, status: res.status });
  };
  const statsError = (err) => {
    console.log(err, "purchazed error");
  };

  const PER_PAGE = limit;

  if (filter == "") {
    var count = Math.ceil(bondDataCount / PER_PAGE);
  } else {
    var count = Math.ceil(searchBondsData.bondsdataCount / PER_PAGE);
  }

  const tableData = usePagination(bondsData, bondDataCount, PER_PAGE);

  const handlePagination = (e, p) => {
    setPage(p);
    tableData.jump(p);
  };
  // validate bond modal
  const handleClose = () => {
    setValidModal(false);
    adminDataTable();
  };
  const [adminStyle, setAdminStyle] = useState(true);

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
    () => stableSort(bondsData, getComparator(order, orderBy)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage]
  );
  const searchSort = useMemo(
    () => stableSort(searchBondsData.bondsData, getComparator(order, orderBy)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage]
  );
  useEffect(() => {
    setBondsData(visibleRows);
    setSearchBondsData({ ...searchBondsData, bondsData: searchSort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleRows, searchSort]);

  // copy wallet code
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState();
  const [copyAddressModal, setCopyAddressModal] = useState(false);
  const copyText = (wallet) => {
    navigator.clipboard
      .writeText(wallet)
      .then(() => {
        setCopied(true);
        setCopyAddressModal(true);
        setMessageText("Address copied to clipboard");
        CloseCopyAddressModal()
      })
      .catch(() => {
        setCopied(false);
      });
    // setMessage(true);
    // setMessageText("Address copied to clipboard");
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
    // <Layout >
    <>
      <AuthorizeModal
        validModal={validModal}
        setValidModal={setValidModal}
        handleClose={handleClose}
        src="/assets/images/222333.png"
        heading="Validation"
        text="You are successfully Valid this bond"
        confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal}
        confirmModalText={confirmModalText}
        adminDataTable1={adminDataTable1}
        message={message}
        setMessage={setMessage}
        messageText={messageText}
      />
      <CopyAddressModal
        copyAddressModal={copyAddressModal}
        setCopyAddressModal={setCopyAddressModal}
        messageText={messageText}
      />
      {adminData.status == true ? (
        <>
          <div class="row">
            <div class="col-md-4">
              <BondDataCard
                iconClass="/assets/icons/totalInvestment.png"
                headText="Total investment"
                value={`$ ${statsInvestment}`}
                compRate={statsInvestmentReturn}
                period="From previous period"
              />
            </div>
            <div class="col-md-4">
              <BondDataCard
                headText="Total Return"
                iconClass="/assets/icons/totalReturn.png"
                value={`$ ${statsReturn}`}
                compRate={previousReturn}
                period="From previous period"
              />
            </div>
            <div class="col-md-4">
              <BondDataCard
                headText="Total Stacked Bonds"
                iconClass="/assets/icons/stackBond.png"
                value={statsBond}
                compRate={previousBond}
                period="From previous period"
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-xl-12 mb-4">
              <TableContainer
                component={Paper}
                checkboxSelection
                style={{
                  borderRadius: "3px",
                  backgroundColor: "#252b3b",
                  overflowX: "hidden",
                  overflowY: "hidden",
                  overflowY: "auto",
                  minHeight: "179px",
                }}
              >
                <div className="d-flex mt-3">
                  <div className="col-6">
                    <div className="semibold text-white me-sm-4 ">
                      List of k-bonds Purchased
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="">
                      {/* <div className="col-md-10"></div> */}
                      <div className=" d-flex justify-content-end">
                        <NavDropdown
                          title={
                            <>
                              <i
                                className="mdi ms- mdi-dots-vertical text-white"
                                style={{
                                  fontSize: "20px",
                                  marginRight: "15px",
                                }}
                              ></i>
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
                            }}
                          >
                            <div
                              className="ps-3 py-2 dropdown-text regular-small"
                              onClick={() => {
                                setValidUser("list");
                              }}
                            >
                              List
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className="px-0 m-0 py-0 dropdown-item "
                            style={{
                              backgroundColor: "white",
                              // border: '1px solid gray',
                              shadow: "2px 0px 0px 3px 0px rgba(0,0,0,0.75)",
                            }}
                          >
                            <div
                              className="ps-3 py-2 dropdown-text regular-small"
                              onClick={() => {
                                setValidUser("validated");
                              }}
                            >
                              Validated K-bonds
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className="px-0 m-0 py-0 dropdown-item "
                            style={{
                              backgroundColor: "white",
                              // border: '1px solid gray',
                              shadow: "2px 0px 0px 3px 0px rgba(0,0,0,0.75)",
                            }}
                          >
                            <div
                              className="ps-3 py-2 dropdown-text regular-small"
                              onClick={() => {
                                setValidUser("not validated");
                              }}
                            >
                              Pending k-bonds
                            </div>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <div className="col-6 d-flex">
                    <label
                      className="d-inline-flex align-items-center  semibold-small text-muted"
                      style={{ marginRight: "0.5rem", marginLeft: "1.5rem" }}
                    >
                      {" "}
                      Show{" "}
                      <select
                        value={limit}
                        onChange={(e) => {
                          setLimit(e.target.value);
                        }}
                        className="custom-select custom-selected custom-select-sm ms-2 text-muted px-2"
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
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </select>{" "}
                      entries{" "}
                    </label>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="float-end ms-4">
                          <div className="ml-2">
                            <label className="text-muted px-2">Search :</label>
                            <input
                              className="ml-2 text-muted regular-xsmall  "
                              value={filter}
                              onChange={handleSearch}
                              style={{
                                backgroundColor: "#2b3244",
                                border: "1px solid #31394e",
                                padding: "3px",
                                outline: "none",
                                height: "30px",
                              }}
                            />
                          </div>
                        </div>
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
                  className="col-12 my-table "
                >
                  {/* table heading */}
                  {/* <TableHead style={{ cursor: "pointer" }}>
                    <TableRow>
                      <TableCell width={140}>
                        <div
                          className="semibold-mid-small text-muted text-truncate"
                          // style={{ width: "100px" }}
                        >
                          Serial Number
                        </div>
                      </TableCell>

                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Value ($)
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Bond Type
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted text-truncate">
                          Date Purchase
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Wallet
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div
                          className="semibold-mid-small text-muted text-truncate"
                          style={{ width: "100px" }}
                        >
                          Stacking Period
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Time Left
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted text-truncate">
                          Expected Return ($)
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Validation
                        </div>
                      </TableCell>
                      <TableCell width={140}>
                        <div className="semibold-mid-small text-muted ">
                          Action
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
                  <EnhancedTableHead
                    // numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    // onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={bondsData.length}
                  />
                  {filter == ""
                    ? bondDataCount !== 0 &&
                      bondsData?.map((row, index) => (
                        // (isItemSelected = isSelected(row.id)),
                        // (labelId = `enhanced-table-checkbox-${index}`),
                        <TableBody key={index}>
                          <ThemeProvider theme={theme}>
                            <TableRow
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
                              <TableCell
                                component="th"
                                scope="row"
                                className="p-0"
                              >
                                <label className="w-100 h-100 mb-1 mt-1">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xxsmall text-white ">
                                      {row.sr_no}
                                      {/* first_name = row.first_name.substring(0, 7) */}
                                      <Tooltip
                                        // title={row.first_name}
                                        placement="top"
                                      >
                                        <span className="regular-xsmall text-muted">
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
                                <label className="w-100 h-100 regular-xxsmall text-white  mb-1 mt-1">
                                  {row.value}
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
                                <label className="w-100 h-100 regular-xxsmall text-white mb-1 mt-1 ">
                                  {row.k_bond_type}
                                  <Tooltip
                                    // title={row.email}
                                    placement="top"
                                  >
                                    <span className="regular-xsmall text-muted">
                                      {/* {(email = row.email.substring(0, 11) + (row.email.length > 10 ? '...' : ''))} */}
                                    </span>
                                  </Tooltip>
                                </label>
                              </TableCell>
                              <TableCell
                                className="p-0"
                                style={{ width: "50px" }}
                              >
                                <label
                                  className="w-57 h-100 regular-xsmall regular-small text-white text-truncate"
                                  style={{ width: "100px", margin: "0px" }}
                                >
                                  <Moment
                                    format="YYYY MM DD"
                                    className="regular-xxsmall"
                                  >
                                    {row.Date_purchase}
                                  </Moment>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xsmall regular-small text-white text-truncate mb-1 mt-1"
                                  style={{ width: "120px" }}
                                >
                                  <div className="d-flex">
                                    <div
                                      className="text-truncate"
                                      style={{ width: "80px" }}
                                    >
                                      <Tooltip
                                        title={
                                          <div className="text-white">
                                            {row.wallet}
                                          </div>
                                        }
                                        placement="top"
                                      >
                                        <span className="regular-xxsmall">
                                          {row.wallet}
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div className="ms-2">
                                      <Image
                                        src="/assets/images/Vector.svg"
                                        alt="vactor"
                                        width={17}
                                        height={20}
                                        onClick={() => copyText(row.wallet)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                  </div>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xxsmall text-white ">
                                  {/* {row.no_of_months} */}
                                  {row.no_of_months} months
                                  <Tooltip
                                    // title={row.email}
                                    placement="top"
                                  >
                                    <span className="regular-xsmall text-muted">
                                      {/* {(email = row.email.substring(0, 11) + (row.email.length > 10 ? '...' : ''))} */}
                                    </span>
                                  </Tooltip>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xxsmall regular-small text-white text-truncate mb-1 mt-1"
                                  style={{ width: "80px" }}
                                >
                                  {/* {row.remaining_days} */}
                                  {row.remaining_days} days
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xxsmall regular-small text-white text-truncate mb-1 mt-1 "
                                  style={{ width: "80px" }}
                                >
                                  {row.exptected_return}
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xsmall regular-small text-white mb-1 mt-1 ">
                                  <label className="w-100 h-100 p-1 regular-xsmall regular-small text-white mb-1 mt-1">
                                    {row.validation_status == "validated" ? (
                                      <button
                                        type="button"
                                        className="btn px-1 stackbtn regular-xxsmall text-white"
                                        // onClick={handleValidate}
                                        style={{
                                          cursor: "default",
                                          // color: "#1cbb8c",
                                          backgroundColor:
                                            "rgba(28,187,140,.18)",
                                        }}
                                      >
                                        {row.validation_status}
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn stackbtn regular-xxsmall text-white"
                                        style={{
                                          // color: "#fcb92c",
                                          backgroundColor:
                                            "rgba(252,185,44,.18",
                                          cursor: "default",
                                        }}
                                      >
                                        Validate
                                      </button>
                                    )}
                                  </label>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xsmall regular-small text-muted mb-1 mt-1 ">
                                  <label className="w-100 h-100 p-1 regular-xsmall regular-small text-muted mb-1 mt-1 ">
                                    {row.validation_status == "validated" ? (
                                      <button
                                        type="button"
                                        className="btn  px-1 stackbtn regular-xxsmall"
                                        // onClick={handleValidate}
                                        style={{
                                          cursor: "default",
                                        }}
                                      >
                                        <Image
                                          src="/assets/images/icons/greenicons/validate.png"
                                          width={30}
                                          height={30}
                                          alt="validated"
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn  px-1 stackbtn regular-xxsmall "
                                        onClick={() =>
                                          handleUnAuthorize(row.sr_no)
                                        }
                                      >
                                        <Image
                                          src="/assets/images/icons/yellowIcons/unvalidateBond.png"
                                          width={30}
                                          height={30}
                                          alt="validated"
                                        />
                                      </button>
                                    )}
                                  </label>
                                </label>
                              </TableCell>
                            </TableRow>
                          </ThemeProvider>
                        </TableBody>
                      ))
                    : searchBondsData.bondsdataCount !== 0 &&
                      searchBondsData.bondsData?.map((row, index) => (
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
                              <TableCell
                                component="th"
                                scope="row"
                                className="p-0"
                              >
                                <label className="w-100 h-100 mb-1 mt-1">
                                  <div className="row">
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 regular-xxsmall text-white ">
                                      {row.sr_no}
                                      {/* first_name = row.first_name.substring(0, 7) */}
                                      <Tooltip
                                        // title={row.first_name}
                                        placement="top"
                                      >
                                        <span className="regular-xsmall text-muted">
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
                                <label className="w-100 h-100 regular-xxsmall text-white  mb-1 mt-1">
                                  {row.value}
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
                                <label className="w-100 h-100 regular-xxsmall text-white mb-1 mt-1 ">
                                  {row.k_bond_type}
                                  <Tooltip
                                    // title={row.email}
                                    placement="top"
                                  >
                                    <span className="regular-xsmall text-muted">
                                      {/* {(email = row.email.substring(0, 11) + (row.email.length > 10 ? '...' : ''))} */}
                                    </span>
                                  </Tooltip>
                                </label>
                              </TableCell>
                              <TableCell
                                className="p-0"
                                style={{ width: "50px" }}
                              >
                                <label
                                  className="w-57 h-100 regular-xxsmall regular-small text-white text-truncate"
                                  style={{ width: "100px", margin: "0px" }}
                                >
                                  <Moment
                                    format="YYYY MM DD"
                                    className="regular-xxsmall"
                                  >
                                    {row.Date_purchase}
                                  </Moment>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xsmall regular-small text-white text-truncate mb-1 mt-1"
                                  style={{ width: "100px" }}
                                >
                                  <div className="d-flex">
                                    <div
                                      className="text-truncate"
                                      style={{ width: "80px" }}
                                    >
                                      <Tooltip
                                        title={
                                          <div className="text-white regular-xxsmall">
                                            {row.wallet}
                                          </div>
                                        }
                                        placement="top"
                                      >
                                        <span className="regular-xxsmall">
                                          {row.wallet}
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div className="ms-2">
                                      <Image
                                        src="/assets/images/Vector.svg"
                                        alt="vactor"
                                        width={17}
                                        height={20}
                                        onClick={() => copyText(row.wallet)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                  </div>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xxsmall text-white">
                                  {/* {row.no_of_months} */}
                                  {row.no_of_months} months
                                  <Tooltip
                                    // title={row.email}
                                    placement="top"
                                  >
                                    <span className="regular-xsmall text-muted">
                                      {/* {(email = row.email.substring(0, 11) + (row.email.length > 10 ? '...' : ''))} */}
                                    </span>
                                  </Tooltip>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xxsmall regular-small text-white text-truncate mb-1 mt-1"
                                  style={{ width: "80px" }}
                                >
                                  {/* {row.remaining_days} */}
                                  {row.remaining_days} days
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label
                                  className=" h-100 regular-xxsmall regular-small text-white text-truncate mb-1 mt-1 "
                                  style={{ width: "80px" }}
                                >
                                  {row.exptected_return}
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xsmall regular-small text-white mb-1 mt-1 ">
                                  <label className="w-100 h-100 p-1 regular-xsmall regular-small text-white mb-1 mt-1">
                                    {row.validation_status == "validated" ? (
                                      <button
                                        type="button"
                                        className="btn text-white px-1 stackbtn regular-xxsmall"
                                        // onClick={handleValidate}
                                        style={{
                                          cursor: "default",
                                          // color: "#1cbb8c",
                                          backgroundColor:
                                            "rgba(28,187,140,.18)",
                                        }}
                                      >
                                        {row.validation_status}
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn text-white stackbtn regular-xxsmall "
                                        style={{
                                          // color: "#fcb92c",
                                          backgroundColor:
                                            "rgba(252,185,44,.18",
                                          cursor: "default",
                                        }}
                                      >
                                        Validate
                                      </button>
                                    )}
                                  </label>
                                </label>
                              </TableCell>
                              <TableCell className="p-0">
                                <label className="w-100 h-100 regular-xsmall regular-small text-muted mb-1 mt-1 ">
                                  <label className="w-100 h-100 p-1 regular-xsmall regular-small text-muted mb-1 mt-1 ">
                                    {row.validation_status == "validated" ? (
                                      <button
                                        type="button"
                                        className="btn  px-1 stackbtn regular-xxsmall"
                                        // onClick={handleValidate}
                                        style={{
                                          cursor: "default",
                                        }}
                                      >
                                        <Image
                                          src="/assets/images/icons/greenicons/validate.png"
                                          width={30}
                                          height={30}
                                          alt="validated"
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn  px-1 stackbtn regular-xxsmall "
                                        onClick={() =>
                                          handleUnAuthorize(row.sr_no)
                                        }
                                      >
                                        <Image
                                          src="/assets/images/icons/yellowIcons/unvalidateBond.png"
                                          width={30}
                                          height={30}
                                          alt="validated"
                                        />
                                      </button>
                                    )}
                                  </label>
                                </label>
                              </TableCell>
                            </TableRow>
                          </ThemeProvider>
                        </TableBody>
                      ))}
                </Table>
                <div className="float-end d-flex mb-3 me-3">
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
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="row">
            <div className="col-lg-4">
              <SkeletonLoader width="100%" height={120} />
            </div>
            <div className="col-lg-4">
              <SkeletonLoader width="100%" height={120} />
            </div>
            <div className="col-lg-4">
              <SkeletonLoader width="100%" height={120} />
            </div>
          </div>
          <div className="row mt-4">
            <SkeletonLoader width="100%" height={330} />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminData;
