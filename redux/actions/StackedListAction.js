import { URL } from "../../public/assets/path/path";
import { STACKED_LIST} from "./types";

const stackedList = (stacked_list) => {
  return {
    type: STACKED_LIST,
    payload:stacked_list,
  };
};

const StackedListAction = (params,token,stackedListSuccess, stackedListError) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: `${URL.baseUrl}stacked_list?${params}`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      // data:params
    };
    axios(config)
      .then((response) => {
        dispatch(stackedList(response.data));
        stackedListSuccess(response.data);
      })
      .catch((err) => {
        stackedListError(err);
      });
  };
};

export default StackedListAction;
