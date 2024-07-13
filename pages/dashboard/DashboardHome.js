import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import GlobalDashboardAction from "../../redux/actions/GlobalDashboardAction";
//Chart Imports
import MixLineBarChart from "../../components/graphs/MixLineBarChart";
import LineGraph from "../../components/graphs/LineGraph";
import GaugeChart from "../../components/graphs/GaugeChart";
import BondDataCard from "../../components/card/BondDataCard";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Image from "next/image";
import UserDataAction from "../../redux/actions/UserDataAction";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import DashboardLoader from "../../components/loader/DashboardLoader";

function DashboardHome() {
  const [globalDashboardData, setGlobalDashboardData] = useState({
    data: ""
  });
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const [showAdminData, setShowAdminData] = useState("");

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem("loginData"));
    if (LoginData) {
      setStatus(LoginData.status);
      console.log(LoginData.status, "login");
    }
    if (LoginData) {
      setShowAdminData(LoginData.data.user.role);
    }

    dispatch(
      GlobalDashboardAction(globalDashboardSuccess, globalDashboardError)
    );
    dispatch(UserDataAction(userDataSuccess, userDataError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [response, setResponse] = useState();
  const globalDashboardSuccess = (res) => {
    setGlobalDashboardData({ ...globalDashboardData, data: res });
    // setResponse(res)
    console.log(res.this_month[1].prev, "eeeeeee");
  };
  console.log(globalDashboardData.data, "dddddd");
  console.log(globalDashboardData.data.monthly_return_evolution,"graph");

  const globalDashboardError = (err) => {
    console.log(err, "err");
  };

  const [totalKbonds, setTotalKbonds] = useState();
  const [previousKbonds, setPreviousKbonds] = useState();
  const [previousPeriod, setPreviousPeriod] = useState();
  const [sales, setSales] = useState();
  const [averagePrice, setAveragePrice] = useState();
  const [returns, setReturns] = useState();
  const [previousReturns, setPreviousReturns] = useState();
  const [monthlyEvolution, setMonthlyEvolution] = useState();
  const [stackingPeriod, setStackingPeriod] = useState();
  const [lastYear, setLastYear] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [monthlyLabels, setMonthlyLabels] = useState();
  const [monthlyData, setMonthlyData] = useState();
  const [monthlyData2, setMonthlyData2] = useState();
  const [weeklyData, setWeeklyData] = useState();
  const [weeklyData2, setWeeklyData2] = useState();
  const [weeklyData3, setWeeklyData3] = useState();
  const [userStatus,setUserStatus]=useState()

  const userDataSuccess = (res) => {
    setUserStatus(res.status)
    setTotalKbonds(res.Total_value_locked[0].lock_vlue);
    setPreviousKbonds(res.Total_value_locked[1].from_previous_period);
    setSales(res.number_of_sales[0].count);
    setPreviousPeriod(res.number_of_sales[1].from_previous_period);
    setAveragePrice(res.avg_price[0].average_price);
    setReturns(res.total_returnn[0].amount);
    setPreviousReturns(res.total_returnn[1].prev_month);
    setMonthlyEvolution(res.monthly_return_evolution);
    setStackingPeriod(res.avg_stack_period);
    setLastYear(res.last_year);
    setMonth(res.this_month);
    setYear(res.this_year);
    setMonthlyLabels(res.monthly_data[2].options.labels);
    setMonthlyData(res.monthly_data[1].data);
    setMonthlyData2(res.monthly_data[0].data);
    setWeeklyData(res.weekly_data[2].options.labels);
    setWeeklyData2(res.weekly_data[0].data);
    setWeeklyData3(res.weekly_data[1].data);
    console.log(res.weekly_data[0].data, "userData");
    console.log(res,'userdata')

  };

  const userDataError = (err) => {
    console.log(err, "err");
  };
  const [dashboardStyle, setDashboardStyle] = useState(true);
  // dashboardStyle={dashboardStyle}
  
  return (
    <>
      {/* {globalDashboardData.data.status == true ? ( */}
      {status == "true" ? (
        showAdminData == "admin" ? (
          // <Layout >
          <>
            {globalDashboardData.data.status == true ? (
              <div className="px-2 bg-whole">
                <div className="row">
                  <div className="col-12"></div>
                </div>
                <div className="row">
                  <div class="col-md-3">
                    <BondDataCard
                      iconClass="/assets/icons/bondSold.png"
                      headText="Total k-bonds sold"
                      value={globalDashboardData.data.number_of_sales[0].count}
                      compRate={globalDashboardData.data.number_of_sales[1].from_previous_period}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Total Value Locked"
                      iconClass="/assets/icons/valueLocked.png"
                      value={`$ ${globalDashboardData.data.Total_value_locked[0].lock_vlue}`}
                      compRate={globalDashboardData.data.Total_value_locked[1].from_previous_period}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Average Selling Price"
                      iconClass="/assets/icons/sellingPrice.png"
                      value={`$ ${globalDashboardData.data.avg_price[0].average_price}`}
                      compRate={globalDashboardData.data.avg_price[1].prev_month}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Total Return"
                      iconClass="/assets/icons/totalReturn.png"
                      value={`$ ${globalDashboardData.data.total_returnn[0].amount}`}
                      compRate={globalDashboardData.data.total_returnn[1].prev_month}
                      period="From previous period"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-7">
                    <LineGraph
                      LineGraphheight="300"
                      month={globalDashboardData.data.this_month}
                      thisYear={globalDashboardData.data.this_year}
                      previousYear={globalDashboardData.data.last_year}
                      monthLabels={
                        globalDashboardData.data.monthly_data[2].options.labels
                      }
                      firstMonth={globalDashboardData.data.monthly_data[1].data}
                      secondMonth={
                        globalDashboardData.data.monthly_data[0].data
                      }
                      weekLabels={
                        globalDashboardData.data.weekly_data[2].options.labels
                      }
                      weekOne={globalDashboardData.data.weekly_data[0].data}
                      weekTwo={globalDashboardData.data.weekly_data[1].data}
                    />
                  </div>
                  <div className="col-xl-5">
                    <MixLineBarChart
                      mixLineGraphheight="190"
                      labels={globalDashboardData.data.monthly_return_evolution[0].labels}
                      data={globalDashboardData.data.monthly_return_evolution[1].data}
                    />
                    <GaugeChart
                      avgStackPeriod={globalDashboardData.data.avg_stack_period}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <DashboardLoader/>
            )}</>
          // </Layout>
        ) : (
          // <Layout dashboardStyle={dashboardStyle}>
          <>
            {userStatus == true ? (
              <div className="px-2 bg-whole">
                <div className="row">
                  <div className="col-12"></div>
                </div>
                <div className="row">
                  <div class="col-md-3">
                    <BondDataCard
                      iconClass="/assets/icons/bondSold.png"
                      headText="Total k-bonds sold"
                      value={sales}
                      compRate={previousPeriod}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Total Value Locked"
                      iconClass="/assets/icons/valueLocked.png"
                      value={`$ ${totalKbonds}`}
                      compRate={previousKbonds}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Average Selling Price"
                      iconClass="/assets/icons/sellingPrice.png"
                      value={`$ ${averagePrice}`}
                      compRate={previousKbonds}
                      period="From previous period"
                    />
                  </div>
                  <div class="col-md-3">
                    <BondDataCard
                      headText="Total Return"
                      iconClass="/assets/icons/totalReturn.png"
                      value={`$ ${returns}`}
                      compRate={previousReturns}
                      period="From previous period"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-7">
                    <LineGraph
                      LineGraphheight="300"
                      month={month}
                      thisYear={year}
                      previousYear={lastYear}
                      monthLabels={monthlyLabels}
                      firstMonth={monthlyData}
                      secondMonth={monthlyData2}
                      weekLabels={weeklyData}
                      weekOne={weeklyData2}
                      weekTwo={weeklyData3}
                    />
                  </div>
                  <div className="col-xl-5">
                    <MixLineBarChart
                      mixLineGraphheight="190"
                      labels={monthlyEvolution[0].labels}
                      data={monthlyEvolution[1].data}
                    />
                    <GaugeChart avgStackPeriod={stackingPeriod} />
                  </div>
                </div>
              </div>
            ) : (
              <DashboardLoader/>
            )}</>
        )
      ) : (
        <div
          className="page-content-user bg-whole"
          style={{ overflowY: "hidden" }}>
            {userStatus == true ?
          <div className="container-fluid">
            <div className="row ">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between col-4">
                <div className="d-flex">
                  <div className="">
                    <Image
                      src="/assets/images/kuveer.png"
                      alt="logo-dark"
                      height={40}
                      width={35}
                    />
                  </div>
                  <div className="mt-1">
                    <div className="mb-sm-0 semibold-large text-white">
                      Kuver
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-start text-white col-8">
                <div className="float-end">
                  <Link href="https://kuver.io/">
                    <button
                      type="button"
                      className="btn btn-primary regular-small mx-2"
                    >
                      Kuver Home
                    </button>
                  </Link>
                  <Link href="../onBoarding/SignIn">
                    <button
                      type="button"
                      className="btn btn-success regular-small text-white bg-main"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-md-3">
                <BondDataCard
                  iconClass="/assets/icons/bondSold.png"
                  headText="Total k-bonds sold"
                  value={sales}
                  compRate={previousPeriod}
                  period="From previous period"
                />
              </div>
              <div class="col-md-3">
                <BondDataCard
                  headText="Total Value Locked"
                  iconClass="/assets/icons/valueLocked.png"
                  value={`$ ${totalKbonds}`}
                  compRate={previousKbonds}
                  period="From previous period"
                />
              </div>
              <div class="col-md-3">
                <BondDataCard
                  headText="Average Selling Price"
                  iconClass="/assets/icons/sellingPrice.png"
                  value={`$ ${averagePrice}`}
                  compRate={previousKbonds}
                  period="From previous period"
                />
              </div>
              <div class="col-md-3">
                <BondDataCard
                  headText="Total Return"
                  iconClass="/assets/icons/totalReturn.png"
                  value={`$ ${returns}`}
                  compRate={previousReturns}
                  period="From previous period"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-7">
                <LineGraph
                  LineGraphheight="335"
                  month={month}
                  thisYear={year}
                  previousYear={lastYear}
                  monthLabels={monthlyLabels}
                  firstMonth={monthlyData}
                  secondMonth={monthlyData2}
                  weekLabels={weeklyData}
                  weekOne={weeklyData2}
                  weekTwo={weeklyData3}
                />
              </div>
              <div className="col-xl-5">
                <MixLineBarChart
                  mixLineGraphheight="190"
                  labels={monthlyEvolution[0].labels}
                      data={monthlyEvolution[1].data}
                />
                <GaugeChart avgStackPeriod={stackingPeriod} />
              </div>
            </div>
          </div>
          :
          <DashboardLoader/>
          }
        </div>
      )}
    </>
  );
}

export default DashboardHome;
