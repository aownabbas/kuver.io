import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

function MixLineBarChart({ mixLineGraphheight,labels,data }) {

  const [state, setState] = useState({
    series: [
      {
        name: "Monthly return",
        data: data,
        // data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          if (val >= 1000000) {
            return (val / 1000000).toFixed(1) + "M";
          } else if (val >= 1000) {
            return (val / 1000).toFixed(1) + "k";
          } else {
            return val;
          }
        
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#777"],
        },
      },

      xaxis: {
        categories: labels,
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: "bottom",
        labels: {
          offsetY: 1,

      },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        legend: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -151,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            if (val >= 1000000) {
              return (val / 1000000).toFixed(1) + "M";
            } else if (val >= 1000) {
              return (val / 1000).toFixed(1) + "k";
            } else {
              return val;
            }
          
          },
        },
      },
      grid: {
        show: false,
      },
      title: {
        // text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <div className="bg-main " style={{minHeight:'25vh'}}>
      {/* <div className=""> */}
      <h4 className={`text-white semibold pt-3 ps-3`}>
        Monthly Return Evolution{" "}
      </h4>
      <div id="chart" className="apexcharts-xaxis-labels">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={150}
          width="100%"
        />
      </div>
    </div>
  );
}

export default MixLineBarChart;
