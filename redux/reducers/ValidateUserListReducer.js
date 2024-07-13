import { VALIDATE_USER } from "../actions/types";

const initialState = {
  valid_user: {},
  loading: false,
  error: "",
};

const ValidateUserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_USER:
      return {
        valid_user: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default ValidateUserListReducer;
