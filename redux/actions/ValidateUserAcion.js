import { URL } from "../../public/assets/path/path";
import { USER_VALIDATE } from "./types";

const validUser = (user_valid) => {
  return {
    type: USER_VALIDATE,
    payload: user_valid,
  };
};

const UserValidAction = (parms,token,UserSuccess, UserError) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "put",
      url: `${URL.baseUrl}validate_user`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      data:parms
    };
    axios(config)
      .then((response) => {
        dispatch(validUser(response.data));
        UserSuccess(response.data);
      })
      .catch((err) => {
        UserError(err);
      });
  };
};

export default UserValidAction;
