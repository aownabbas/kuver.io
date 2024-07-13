import React from "react";
import dynamic from "next/dynamic";

function AreaGraph({
  evoulution,
  evoulutionName,
  evoulution1,
  evoulution1Name,
  months,
}) {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  const state = {
    series: [
      {
        // name: 'series1',
        // data: [31, 40, 28, 51, 42, 109, 100],
        name: evoulutionName,
        data: evoulution,
      },
      {
        // name: 'series2',
        // data: [11, 32, 45, 32, 34, 52, 41],
        name: evoulution1Name,
        data: evoulution1,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        show: false,
      },
      // xaxis: {
      //   type: 'datetime',
      //   categories: [
      //     '2018-09-19T00:00:00.000Z',
      //     '2018-09-19T01:30:00.000Z',
      //     '2018-09-19T02:30:00.000Z',
      //     '2018-09-19T03:30:00.000Z',
      //     '2018-09-19T04:30:00.000Z',
      //     '2018-09-19T05:30:00.000Z',
      //     '2018-09-19T06:30:00.000Z',
      //   ],
      // },
      // tooltip: {
      //   x: {
      //     format: 'dd/MM/yy HH:mm',
      //   },
      // },
      labels: months,
    },
  };

  return (
    <div className="apex-charts bg-main mb-4" style={{ height: "185px" }}>
      <h4 className="card-title text-white semibold pt-3 ps-3">
        Evolution of return in USD per month
      </h4>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={130}
        width="100%"
        className="px-2"
      />
    </div>
  );
}

export default AreaGraph;
