import React from "react";
import Moment from "react-moment";

function UserActivity({ activity }) {
  return (
    <div
      className="card "
      style={{
        height: "455px",
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "black",
      }}
    >
      <div className="card-body bg-main">
        <div className="dropdown float-end">
          <a
            href="#"
            className="dropdown-toggle arrow-none card-drop"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <i className="mdi mdi-dots-vertical text-white"></i> */}
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            {/* <!-- item--> */}
            <a href="javascript:void(0);" className="dropdown-item">
              Sales Report
            </a>
            {/* <!-- item--> */}
            <a href="javascript:void(0);" className="dropdown-item">
              Export Report
            </a>
            {/* <!-- item--> */}
            <a href="javascript:void(0);" className="dropdown-item">
              Profit
            </a>
            {/* <!-- item--> */}
            <a href="javascript:void(0);" className="dropdown-item">
              Action
            </a>
          </div>
        </div>

        <h4 className="card-title semibold mb-4 text-white">
          Recent Activity Feed
        </h4>

        <div data-simplebar style={{ MaxHeight: "330px" }}>
          <ul className="list-unstyled activity-wid">
            {activity?.map((item, index) => {
              // console.log(item,'item')
              return (
                <li className="activity-list" key={index}>
                  <div className="activity-icon avatar-xs">
                    <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                      <i className="ri-edit-2-fill"></i>
                    </span>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-size-13 text-white">
                        <Moment format="MMMM DD, YYYY">{item.date}</Moment>{" "}
                        <small className="text-muted">
                          <Moment format="HH:mm">{item.date}</Moment>
                        </small>
                      </h5>
                    </div>

                    <div>
                      <p className="text-muted mb-0">{item.title}</p>
                    </div>
                  </div>
                </li>
              );
            })}
            {/* <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-user-2-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    21 Apr, 2020 <small className="text-muted">08:01 pm</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Added an interest “Volunteer Activities”
                  </p>
                </div>
              </div>
            </li>
            <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-bar-chart-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    17 Apr, 2020 <small className="text-muted">09:23 am</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Joined the group “Boardsmanship Forum”
                  </p>
                </div>
              </div>
            </li>
            <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-mail-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    11 Apr, 2020 <small className="text-muted">05:10 pm</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Responded to need “In-Kind Opportunity”
                  </p>
                </div>
              </div>
            </li>
            <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-calendar-2-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    07 Apr, 2020 <small className="text-muted">12:47 pm</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Created need “Volunteer Activities”
                  </p>
                </div>
              </div>
            </li>
            <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-edit-2-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    05 Apr, 2020 <small className="text-muted">03:09 pm</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Attending the event “Some New Event”
                  </p>
                </div>
              </div>
            </li>
            <li className="activity-list">
              <div className="activity-icon avatar-xs">
                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                  <i className="ri-user-2-fill"></i>
                </span>
              </div>
              <div>
                <div>
                  <h5 className="font-size-13 text-white">
                    02 Apr, 2020 <small className="text-muted">12:07 am</small>
                  </h5>
                </div>

                <div>
                  <p className="text-muted mb-0">
                    Responded to need “In-Kind Opportunity”
                  </p>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
