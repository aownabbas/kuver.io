import { URL } from "../../public/assets/path/path";
import { VALIDATE_USER } from "./types";

const validateUser = (valid_user) => {
  return {
    type: VALIDATE_USER,
    payload: valid_user,
  };
};

const ValidateUserListAction = (
  params,
  token,
  validUserSuccess,
  validUserError
) => {
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: `${URL.baseUrl}validate_user_list?${params}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // data: params,
    };
    axios(config)
      .then((response) => {
        console.log(response,"res");
        dispatch(validateUser(response.data));
        validUserSuccess(response.data);
      })
      .catch((err) => {
        validUserError(err);
      });
  };
};

export default ValidateUserListAction;
