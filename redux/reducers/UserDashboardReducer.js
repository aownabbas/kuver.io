import { USER_DASHBOARD } from "../actions/types";

const initialState = {
    user_dashboard: {},
  loading: false,
  error: "",
};

const UserDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DASHBOARD:
      return {
        user_dashboard: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default UserDashboardReducer;
