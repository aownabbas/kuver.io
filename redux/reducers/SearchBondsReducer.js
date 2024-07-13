import { SEARCH_BONDS } from "../actions/types";

const initialState = {
  search_bonds: [],
  error: "",
  loading: "false",
};
const SearchBondsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BONDS:
      return {
        search_bonds: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};
export default SearchBondsReducer;
