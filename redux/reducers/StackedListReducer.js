import { STACKED_LIST } from "../actions/types";

const initialState = {
  stacked_list: {},
  loading: false,
  error: "",
};

const StackedListReducer = (state = initialState, action) => {
  switch (action.type) {
    case STACKED_LIST:
      return {
        stacked_list: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default StackedListReducer;
