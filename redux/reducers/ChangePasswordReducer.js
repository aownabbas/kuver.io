import { CHANGE_PASSWORD } from '../actions/types';

const initialState = {
  change_Password: {},
  loading: false,
  error: '',
};

const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        change_Password: action.payload,
        loading: false,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default ChangePasswordReducer;