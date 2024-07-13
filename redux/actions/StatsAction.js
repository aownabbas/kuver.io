import { URL } from "../../public/assets/path/path";
import { ADMIN_STATS} from "./types";

const statsAdmin = (admin_stats) => {
  return {
    type: ADMIN_STATS,
    payload: admin_stats,
  };
};

const StatsAction = (token,statsSuccess, statsError) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: `${URL.baseUrl}stats`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      // data:params
    };
    axios(config)
      .then((response) => {
        dispatch(statsAdmin(response.data));
        statsSuccess(response.data);
      })
      .catch((err) => {
        statsError(err);
      });
  };
};

export default StatsAction;
