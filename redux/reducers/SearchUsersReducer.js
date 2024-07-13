import { SEARCH_USERS } from "../actions/types";

const initialState = {
  search_users: [],
  error: "",
  loading: "false",
};
const SearchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        search_users: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};
export default SearchUsersReducer;
