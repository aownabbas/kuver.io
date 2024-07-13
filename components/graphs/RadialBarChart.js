import React, { useState } from "react";
import dynamic from "next/dynamic";

function RadialBarChart() {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const [state, setState] = useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Earning"],
    },
  });

  return (
    <div className="bg-main mb-4">
      <div className=" pt-3 ps-3">
        <h4 className="card-title text-white semibold ">Earning Reports</h4>
      </div>
      <div class="text-center">
        <div class="row text-center">
          <div class="col-sm-6">
            <div>
              {/* <ReactApexChart
            options={state.options}
            series={state.series}
            type="radialBar"
            height={150}
            width="100%"
          /> */}
              Graph
              <p class="text-muted text-truncate mb-2 ">Weekly Earnings</p>
              <h5 class="mb-4 text-white">$2,523</h5>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="mt-5 mt-sm-0">
              {/* <ReactApexChart options={state.options} series={state.series} type="radialBar" height={150} width="100%" /> */}

              <p class="text-muted text-truncate mb-2">Monthly Earnings</p>
              <h5 class="mb-4 text-white">$11,235</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadialBarChart;
