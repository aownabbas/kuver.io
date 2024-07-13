import React from "react";
import CircleLoader from "./CircleLoader";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const EarningReportCard = () => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  return (
    <div className="bg-main mb-4">
      <div className=" pt-3 ps-3 ">
        <h4 className="card-title text-white semibold ">Earning Reports</h4>
        <div className="row mt-3">
          {/* <div className=" text-center mt-2">
          <CircleLoader value="3 month"/>
        
        <p class="text-muted text-truncate mb-2">Weekly Earnings</p>
        <h5 class=" text-white">$1,235</h5>
        </div> */}
        <div>
          <BorderLinearProgress variant="determinate" value={80} />
          </div>
          <div className="row">
            <div className="col-6 mt-2">
              <p class="text-muted text-truncate mb-2">Time Passed</p>
              <h5 class=" text-white">2 month</h5>
            </div>
            <div className="col-6 mt-2">
              <div className="float-end">
              <p class="text-muted text-truncate mb-2">Time Left</p>
              <h5 class=" text-white">1 month</h5>
              </div>
            </div>
          </div>

          {/* <div className="col-6 text-center mt-2">
          <CircleLoader value="90"/>
        
        <p class="text-muted text-truncate mb-2">Monthly Earnings</p>
        <h5 class=" text-white">$11,235</h5>
        </div> */}
        </div>
      </div>
    </div>
  );
};
export default EarningReportCard;
