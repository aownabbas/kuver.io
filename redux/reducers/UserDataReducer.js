import { USER_DATA } from "../actions/types";

const initialState = {
  user_data: {},
  loading: false,
  error: "",
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        user_data: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default UserDataReducer;
