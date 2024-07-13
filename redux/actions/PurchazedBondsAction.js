import { URL } from "../../public/assets/path/path";
import { PURCHAZE_BOND} from "./types";

const purchazedBond = (purchaze_bond) => {
  return {
    type: PURCHAZE_BOND,
    payload: purchaze_bond,
  };
};

const PurchazedBondsAction = (params,token,purchazedSuccess, purchazedError) => {
  // console.log(params,'params')
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "post",
      url: `${URL.baseUrl}purchazed_bonds`,
      headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
      data:params
    };
    axios(config)
      .then((response) => {
        dispatch(purchazedBond(response.data));
        purchazedSuccess(response.data);
      })
      .catch((err) => {
        purchazedError(err);
      });
  };
};

export default PurchazedBondsAction;
