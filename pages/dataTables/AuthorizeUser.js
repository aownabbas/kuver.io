import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BondDataCard from "../../components/card/BondDataCard";
import AreaGraph from "../../components/graphs/AreaGraph";
import StackBondForm from "../../components/user/bond/StackBondForm";
import UserActivity from "../../components/user/UserActivity";
import UserCard from "../../components/user/UserCard";
import { useDispatch } from "react-redux";
import UserDashboardAction from "../../redux/actions/UserDashboardAction";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import { useRouter } from "next/router";
import GaugeChart from "../../components/graphs/GaugeChart";
var BondForm = true;
function AuthorizeUser() {
  const dispatch = useDispatch();

  const [bondAvailable, setBondAvailable] = useState();

  const [authorizeStyle, setAuthorizeStyle] = useState(true);
  const router=useRouter()
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem("loginData"));
    if (LoginData) {
      dispatch(
        UserDashboardAction(
          LoginData.data.token,
          userDashboardSuccess,
          userDashboardError
        )
      );
    }else{
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [investment, setInvestment] = useState("");
  const [balance, setBalance] = useState();
  const [profit, setprofit] = useState();
  const [type, setType] = useState();
  const [penality, setPenality] = useState();
  const [percentage, setPercentage] = useState();
  const [daysOver, setDaysOver] = useState();
  const [monthOver, setMonthOver] = useState();
  const [activity, setActivity] = useState();
  const [evoulution, setEvolution] = useState();
  const [evoulution1, setEvolution1] = useState();
  const [evoulution1Name, setEvolution1Name] = useState();
  const [evoulutionName, setEvolutionName] = useState();
  const [months, setMonths] = useState();
  const [authorizeUser, setAuthorizeUser] = useState({
    status: "",
    message: "",
    avgStackPeriod:""
  });
  console.log(authorizeUser,"avg_stack_period");

  const userDashboardSuccess = (res) => {
    setInvestment(res.data.total_amount_invested);
    BondForm = res.data.status;
    setAuthorizeUser({
      ...authorizeUser,
      status: res.status,
      message: res.data.status,
      avgStackPeriod:res.data.avg_stack_period
    });
    setBalance(res.data.current_balance);
    setprofit(res.data.total_profit);
    setType(res.data.user_bond_info.type);
    setPenality(res.data.user_bond_info.penalty_percentage);
    setPercentage(res.data.user_bond_info.return_percentage);
    setDaysOver(res.data.user_bond_info.days_over);
    setMonthOver(res.data.user_bond_info.days_left);
    // setBondAvailable(res.status);

    setActivity(res.data.activities);
    setEvolution(res.data.monthly_return_evolution[1].data);
    setEvolutionName(res.data.monthly_return_evolution[1].name);
    setEvolution1(res.data.monthly_return_evolution[0].data);
    setEvolution1Name(res.data.monthly_return_evolution[0].name);
    setMonths(res.data.monthly_return_evolution[3].labels);

    console.log(res, "purchazed succ");
  };
  const userDashboardError = (err) => {
    console.log(err, "purchazed error");
  };
  
  console.log(authorizeUser.status, "auth");
  return (
    // <Layout authorizeStyle={authorizeStyle}>
    <>
      <div
        className="col-12"
        style={{ overflowX: "hidden", overflowY: "hidden" }}
      >
        {authorizeUser.status == 200 ? (
          authorizeUser.message == true ? (
            <>
              {/* <div className="col-xl-8"> */}
              <div className="row">
                <div class="col-md-4">
                  <BondDataCard
                    iconClass="/assets/icons/totalInvestment.png"
                    headText="Total amount invested"
                    value={`$ ${investment}`}
                    compRate="2.4%"
                    period="From previous period"
                  />
                </div>
                <div class="col-md-4">
                  <BondDataCard
                    headText="Current Balance"
                    iconClass="/assets/icons/totalReturn.png"
                    value={`$ ${balance}`}
                    compRate="2.4%"
                    period="From previous period"
                  />
                </div>
                <div class="col-md-4">
                  <BondDataCard
                    headText="Total Return to date"
                    iconClass="/assets/icons/totalReturn.png"
                    value={`$ ${profit}`}
                    compRate="2.4%"
                    period="From previous period"
                  />
                </div>
              </div>

              {/* </div> */}
              <div className="row" >
                <div className="col-xl-8">
                  <div class="row">
                    <UserCard
                      type={type}
                      penality={penality}
                      percentage={percentage}
                      daysOver={daysOver}
                      monthOver={monthOver}
                    />
                    <div className="col-xl-7" >
                      <div style={{height:"455px"}}>
                      {/* <EarningReportCard/> */}
                      <AreaGraph
                        evoulution={evoulution}
                        evoulutionName={evoulutionName}
                        evoulution1={evoulution1}
                        evoulution1Name={evoulution1Name}
                        months={months}
                      />
                      <GaugeChart avgStackPeriod={authorizeUser.avgStackPeriod} height="245px" />
                    </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  {/* <RadialBarChart /> */}
                  <UserActivity activity={activity} />
                </div>
              </div>
            </>
          ) : (
            <StackBondForm />
          )
        ) : (""
      //     <div>
      //   <div className="row">
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={120} />
      //   </div>
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={120} />
      //   </div>
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={120} />
      //   </div>
      //   </div>
      //   <div className="row mt-4">
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={330} />
      //   </div>
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={330} />
      //   </div>
      //   <div className="col-lg-4">
      //     <SkeletonLoader width="100%" height={330} />
      //   </div>
      //   </div>
      // </div>
        )}
      </div>
      </>
  );
}

export default AuthorizeUser;
