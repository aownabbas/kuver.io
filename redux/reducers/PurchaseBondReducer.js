import { PURCHASE_BOND } from '../actions/types';

const initialState = {
  bond: {},
  loading: false,
  error: '',
};

const PurchaseBondReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_BOND:
      return {
        bond: action.payload,
        loading: false,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default PurchaseBondReducer;
