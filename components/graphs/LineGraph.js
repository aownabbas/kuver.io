import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Row, Col, Card, CardBody, ButtonGroup, Button } from "reactstrap";
function LineGraph({
  LineGraphheight,
  thisMonth,
  thisYear,
  previousYear,
  monthLabels,
  firstMonth,
  secondMonth,
  weekLabels,
  weekOne,
  weekTwo,
  month,
}) {
  // console.log(weekLabels,"wek");

  const [firstData, setFirstData] = useState(firstMonth);
  const [secondData, setSecondData] = useState(secondMonth);
  const [label, setLabel] = useState(monthLabels);
  const [duration, setDuration] = useState("monthly");
  const [buttonStyle,setButtonStyle]=useState("")
  const monthData = () => {
    setButtonStyle("monthly")
    setState({
      series: [
        {
          name: "2023",
          type: "column",
          data: secondMonth,
          // data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
        {
          name: "2022",
          type: "line",
          data: firstMonth,
          // data: [23, 32, 27, 38, 27, 32, 27, 38, 22, 31, 21, 16],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 3],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },

        grid: {
          show: false,
        },
        colors: ["#5664d2", "#1cbb8c"],
        labels: monthLabels,
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    });
  };
  const weekData = () => {
    setButtonStyle("weekly")
    // console.log(label,"wek");
    setState({
      series: [
        {
          name: "week2",
          type: "column",
          data: weekTwo,
          // data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
        {
          name: "week1",
          type: "line",
          data: weekOne,
          // data: [23, 32, 27, 38, 27, 32, 27, 38, 22, 31, 21, 16],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 3],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },

        grid: {
          show: false,
        },
        colors: ["#5664d2", "#1cbb8c"],
        labels: weekLabels,
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    });
  };

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  useEffect(() => {}, []);
  // console.log(labels, "labels");
  const [state, setState] = useState({
    series: [
      {
        name: "2023",
        type: "column",
        data: secondData,
        // data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
      {
        name: "2022",
        type: "line",
        data: firstData,
        // data: [23, 32, 27, 38, 27, 32, 27, 38, 22, 31, 21, 16],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 3],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },

      grid: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c"],
      labels: label,
      // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  });

  return (
    <Card
      className=""
      style={{ backgroundColor: "#252b3b", minHeight: "95.7%" }}
    >
      <CardBody>
        <div className="float-end d-none d-md-inline-block">
          <ButtonGroup className="mb-2">
            {/* <Button className='bg-button text-white regular-xxsmall' size="sm" active type="button">
              Today
            </Button> */}
            <Button
              size="sm"
              className={buttonStyle=="weekly" ? "bg-button text-white regular-xxsmall" : "text-white regular-xxsmall"}
              active
              type="button"
              onClick={weekData}
            >
              Weekly
            </Button>
            <Button
              size="sm"
              className= {buttonStyle=="monthly" ? "bg-button text-white regular-xxsmall": "text-white regular-xxsmall" }
              active
              onClick={monthData}
              type="button"
            >
              Monthly
            </Button>
          </ButtonGroup>
        </div>
        <h4 className="card-title text-white semibold ">
          Total Value Locked Evolution
        </h4>
        <div className="col-12">
          <div id="line-column-chart" className="apex-charts" dir="ltr">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="line"
              height={LineGraphheight}
              width="100%"
            />
          </div>
        </div>
      </CardBody>

      <CardBody className="top-border text-center">
        <Row>
          <Col sm={4}>
            <div className="d-inline-flex">
              {month && month[0]?.this !== null ? (
                <h5 className="me-2 text-white semibold">${month[0]?.this}</h5>
              ) : (
                "0"
              )}
              {month && month[1].prev !== null ? (
                <div className="text-success regular-small">
                  <i className="mdi mdi-menu-up font-size-14"> </i>
                  {month[1].prev} %
                </div>
              ) : (
                <div className="text-success regular-small">
                  <i className="mdi mdi-menu-up font-size-14"> </i>0 %
                </div>
              )}
            </div>
            <p className="text-muted text-truncate mb-0 regular-xxsmall">
              This Week :
            </p>
          </Col>

          <Col sm={4}>
            <div className="mt-4 mt-sm-0">
              <p className="mb-2 text-muted text-truncate regular-xxsmall">
                <i className="mdi mdi-circle text-primary font-size-10 me-1"></i>{" "}
                This Month :
              </p>
              <div className="d-inline-flex">
                {thisYear && thisYear[0]?.this !== null ? (
                  <h5 className="mb-0 me-2 text-white semibold">
                    $ {thisYear[0]?.this}
                  </h5>
                ) : (
                  "0"
                )}
                {thisYear && thisYear[1].prev !== null ? (
                  <div className="text-success regular-small">
                    <i className="mdi mdi-menu-up font-size-14"> </i>
                    {thisYear[1].prev} %
                  </div>
                ) : (
                  <div className="text-success regular-small">
                    <i className="mdi mdi-menu-up font-size-14"> </i>0 %
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="mt-4 mt-sm-0">
              <p className="mb-2 text-muted text-truncate regular-xxsmall">
                <i className="mdi mdi-circle text-success font-size-10 me-1"></i>{" "}
                Previous Year :
              </p>
              <div className="d-inline-flex">
                {previousYear && previousYear[0]?.last !== null ? (
                  <h5 className="mb-0 text-white semibold">
                    $ {previousYear[0]?.last}
                  </h5>
                ) : (
                  "0"
                )}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default LineGraph;
