import React from "react";
import { useState } from "react";
import BondDataCard from "../card/BondDataCard";
import AreaGraph from "../graphs/AreaGraph";
import StackBondForm from "./bond/StackBondForm";
import EarningReportCard from "./earnings/EarningReportCard";
import UserActivity from "./UserActivity";
import UserCard from "./UserCard";

function UserData() {
  const [bondAvailable, setBondAvailable] = useState(false);
  return (
    <>
      {bondAvailable == true ? (
        <>
          {/* <div className="col-xl-8"> */}
          <div className="row">
            <BondDataCard
              iconClassName="ri-stack-line semibold-large text-primary"
              headText="Total amount invested"
              value="10"
              compRate="2.4%"
              period="From previous period"
            />
            <BondDataCard
              headText="Current Balance"
              iconClassName="ri-store-2-line semibold-large text-primary"
              value="20"
              compRate="2.4%"
              period="From previous period"
            />
            <BondDataCard
              headText="Total Return to date"
              iconClassName="ri-briefcase-4-line semibold-large text-primary"
              value="30"
              compRate="2.4%"
              period="From previous period"
            />
          </div>

          {/* </div> */}
          <div className="row">
            <div className="col-xl-8">
              <div class="row">
                <UserCard />
                <div className="col-xl-7">
                  <EarningReportCard/>
                  <AreaGraph />
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              {/* <RadialBarChart /> */}
              <UserActivity />
            </div>
          </div>
        </>
      ) : (
        <StackBondForm />
      )}
    </>
  );
}

export default UserData;
