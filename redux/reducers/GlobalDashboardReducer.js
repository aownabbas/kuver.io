import { GLOBAL_DASHBOARD } from '../actions/types';

const initialState = {
  g_dashboard: {},
  loading: false,
  error: '',
};

const GlobalDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_DASHBOARD:
      return {
        g_dashboard: action.payload,
        loading: false,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default GlobalDashboardReducer;