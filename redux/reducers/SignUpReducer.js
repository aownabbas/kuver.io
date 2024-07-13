import { SIGNUP_REQUEST } from '../actions/types';

const initialState = {
  signUp: {},
  loading: false,
  error: '',
};

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        signUp: action.payload,
        loading: false,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default SignUpReducer;
