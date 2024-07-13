import { URL } from "../../public/assets/path/path";
import { SEARCH_BONDS } from "./types";

const searchBonds = (search_bonds) => {
  return {
    type: SEARCH_BONDS,
    payload: search_bonds,
  };
};
const SearchBondsAction = (
  params,
  token,
  searchBondsDataSuccess,
  searchBondsDataError,
) => {
  return (dispatch) => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL.baseUrl}search_bond?${params}`,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data,"resssss");
        dispatch(searchBonds(response.data));
        searchBondsDataSuccess(response.data);
      })
      .catch((error) => {
        searchBondsDataError(error)
      });
  };
};
export default SearchBondsAction;
