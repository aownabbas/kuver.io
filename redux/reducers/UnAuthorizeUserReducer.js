import { UN_AUTHORIZE } from "../actions/types";

const initialState = {
  un_authorize: {},
  loading: false,
  error: "",
};

const UnAuthorizeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UN_AUTHORIZE:
      return {
        un_authorize: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default UnAuthorizeUserReducer;
