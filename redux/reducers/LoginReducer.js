import { LOGIN_REQUEST } from '../actions/types';

const initialState = {
  login: {},
  loading: false,
  error: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        login: action.payload,
        loading: false,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default LoginReducer;
