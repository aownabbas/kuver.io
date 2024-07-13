import { ADMIN_STATS } from "../actions/types";

const initialState = {
  admin_stats: {},
  loading: false,
  error: "",
};

const StatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_STATS:
      return {
        admin_stats: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default StatsReducer;
