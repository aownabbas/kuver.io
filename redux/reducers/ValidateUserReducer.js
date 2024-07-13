import { USER_VALIDATE } from "../actions/types";

const initialState = {
  user_valid: {},
  loading: false,
  error: "",
};

const ValidateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_VALIDATE:
      return {
        user_valid: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default ValidateUserReducer;
