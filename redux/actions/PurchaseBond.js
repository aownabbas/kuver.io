import { PURCHASE_BOND } from "./types";
import { URL } from "../../public/assets/path/path";

const bondPurchase = (bond) => {
  return {
    type: PURCHASE_BOND,
    payload: bond,
  };
};
const PurchaseBondAction = (
  params,
  token,
  bondPurchaseSuccess,
  bondPurchaseError
) => {
  // alert('ddd')
  return (dispatch) => {
    var axios = require("axios");
    var config = {
      method: "post",
      url: `${URL.baseUrl}purchase_bond?${params}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };
    axios(config)
      .then((response) => {
        dispatch(bondPurchase(response.data));
        bondPurchaseSuccess(response.data);
      })
      .catch((err) => {
        bondPurchaseError(err);
      });
  };
};
export default PurchaseBondAction;
