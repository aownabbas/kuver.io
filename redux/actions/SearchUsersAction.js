import { URL } from "../../public/assets/path/path";
import { SEARCH_USERS } from "./types";

const userAction = (search_users) => {
  return {
    type: SEARCH_USERS,
    payload: search_users,
  };
};
const SearchUsersAction = (
  params,
  token,
  searchUserDataSuccess,
  searchUserDataError
) => {
  return (dispatch) => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL.baseUrl}search_user?${params}`,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data,"resssss");
        dispatch(userAction(response.data));
        searchUserDataSuccess(response.data);
      })
      .catch((error) => {
        searchUserDataError(error)
      });
  };
};
export default SearchUsersAction;
