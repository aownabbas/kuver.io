import Image from "next/image";
import React, { useEffect, useState } from "react";
import RangeSlider from "../slider/RangeSlider";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

function UserCard({ type, penality, percentage, daysOver, monthOver }) {
  const [bondTimePercentage,setBondTimePercentage]=useState()

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
  console.log(bondTimePercentage,"perce");
  useEffect(()=>{
    var totalValue=monthOver+daysOver
   const percentage= daysOver/totalValue
   var getPercentage=percentage*100
   setBondTimePercentage(getPercentage)
   
  },[daysOver,monthOver])
  return (
    <div class="col-xl-5">
      <div class="card">
        <div class="card-body bg-main" style={{height:"455px"}}>
          <div class="text-center">
            {type == "Gold" ? (
              <Image
                src="/assets/images/companies/gold-coin.png"
                width={20}
                height={20}
                alt="img-1"
                class="avatar-sm mt-2 mb-4"
              />
            ) : type == "Silver" ? (
              <Image
                src="/assets/images/companies/silver-coin.png"
                width={20}
                height={20}
                alt="img-1"
                class="avatar-sm mt-2 mb-4"
              />
            ) : type == "Copper" ? (
              <Image
                src="/assets/images/companies/copper-coin.png"
                width={20}
                height={20}
                alt="img-1"
                class="avatar-sm mt-2 mb-4"
              />
            ) : type == "Bronze" ? (
              <Image
                src="/assets/images/companies/bronze-coin.png"
                width={20}
                height={20}
                alt="img-1"
                class="avatar-sm mt-2 mb-4"
              />
            ) : type == "Platinum" ? (
              <Image
                src="/assets/images/companies/platinum-coin.png"
                width={20}
                height={20}
                alt="img-1"
                class="avatar-sm mt-2 mb-4"
              />
            ) : null
            }
            <div class="flex-1">
              <h5 class="text-truncate">
                <a href="#" class="text-muted">
                  {type}
                </a>
              </h5>
              {/* <p class="text-muted">
                <i class="mdi mdi-account me-1"></i> Wayne McClain
              </p> */}
            </div>
          </div>

          <hr class="my-4 text-muted" />

          <div class="row text-center">
            <div class="col-6">
              <p class="text-muted mb-2">Yearly Return</p>
              <h5 className="text-white">{percentage}%</h5>
            </div>
            <div class="col-6">
              <p class="text-muted mb-2">Penalty</p>
              <h5 className="text-white">{penality}%</h5>
            </div>
          </div>
          <hr class="my-4 text-muted" />
          {daysOver == "awaiting to validate"?
          <div className="mt-4">
            <h4 className="card-title text-white semibold mt-5 text-center">
            Bonds Stacking Detail
      </h4>
           <div className="pt-4">
           <BorderLinearProgress variant="determinate" value={0} />
         </div>
         <div className="row">
              <div className="col-6 mt-2">
                <p class="text-muted text-truncate mb-2">Time Passed</p>
                <h5 class=" text-white" style={{fontSize:'17px'}}>Pending</h5>
              </div>
              <div className="col-6 mt-2">
                <div className="float-end">
                  <p class="text-muted text-truncate mb-2">Time Left</p>
                  <h5 class=" text-white" style={{fontSize:'17px'}}>Pending</h5>
                </div>
              </div>
            </div>
         </div>
          :
          <div className="mt-4">
            <h4 className="card-title text-white semibold mt-5 text-center">
            Bonds Stacking Detail
      </h4>
            <div className="pt-4">
              <BorderLinearProgress variant="determinate" value={bondTimePercentage} />
            </div>
            <div className="row">
              <div className="col-6 mt-2">
                <p class="text-muted text-truncate mb-2">Time Passed</p>
                <h5 class=" text-white" style={{fontSize:'17px'}}>{daysOver} days</h5>
              </div>
              <div className="col-6 mt-2">
                <div className="float-end">
                  <p class="text-muted text-truncate mb-2">Time Left</p>
                  <h5 class=" text-white" style={{fontSize:'17px'}}>{monthOver} days</h5>
                </div>
              </div>
            </div>
          </div>}
          {/* <div className="mt-4 mb-2">
            <RangeSlider />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
