import { PURCHAZE_BOND } from "../actions/types";

const initialState = {
  purchaze_bond: {},
  loading: false,
  error: "",
};

const PurchazedBondsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHAZE_BOND:
      return {
        purchaze_bond: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default PurchazedBondsReducer;
