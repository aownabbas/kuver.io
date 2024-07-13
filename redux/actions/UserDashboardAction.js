import { URL } from "../../public/assets/path/path";
import {USER_DASHBOARD} from "./types";

const userDashboard = (user_dashboard) => {
  return {
    type: USER_DASHBOARD,
    payload: user_dashboard,
  };
};

const UserDashboardAction = (token,userDashboardSuccess, userDashboardError) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: `${URL.baseUrl}userDashboard`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      // data:params
    };
    axios(config)
      .then( (response) => {
        console.log(response,'responssee');
        userDashboardSuccess(response);
        dispatch(userDashboard(response));
      })
      .catch((err) => {
        userDashboardError(err);
        console.log(err,"err");
      });
  };
};

export default UserDashboardAction;
