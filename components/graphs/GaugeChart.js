import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

function GaugeChart({avgStackPeriod,height}) {
  console.log(avgStackPeriod,"avgStackPeriod");
  const [option, setOptions] = useState({
    series: [
      {
        type: "gauge",
        min: "3",
        max: "12",
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.25, "#FFEEE3"],
              [0.5, "#67E0E3"],
              [0.75, "#37A2DA"],
              [1, "#FD666D"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "inherit",
          },
        },
        axisTick: {
          distance: -15,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -15,
          length: 25,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 20,
          fontSize: 15,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} ",
          color: "inherit",
        },
        data: [
          {
            value:`${avgStackPeriod}`,
          },
        ],
        splitNumber: 9,
      },
    ],
  });
  // ,height:height
  return (
    <div className="mt-4 text-white bg-main mb-4" style={{minHeight:"20vh",height:height}}>
      <h5 className="text-white semibold pt-3 ps-3">Average Stacking Period</h5>
      <div className="">
      <ReactECharts
        className="gaugeStyle"
        option={option}
        height="100%"
        width="100%"
      />
      </div>
    </div>
  );
}

export default GaugeChart;
