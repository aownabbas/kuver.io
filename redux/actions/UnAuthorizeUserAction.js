import { URL } from "../../public/assets/path/path";
import { UN_AUTHORIZE } from "./types";

const unAuthorizeUser = (un_authorize) => {
  return {
    type: UN_AUTHORIZE,
    payload: un_authorize,
  };
};

const UnAuthorizeUserAction = (parms,token,UnauthorizeSuccess, UnauthorizeError) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "delete",
      url: `${URL.baseUrl}unauthorize`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      data:parms
    };
    axios(config)
      .then((response) => {
        dispatch(unAuthorizeUser(response.data));
        UnauthorizeSuccess(response.data);
      })
      .catch((err) => {
        UnauthorizeError(err);
      });
  };
};

export default UnAuthorizeUserAction;
