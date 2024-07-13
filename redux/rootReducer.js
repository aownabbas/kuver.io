import { combineReducers } from "redux";
import ChangePasswordReducer from "./reducers/ChangePasswordReducer";
import GlobalDashboardReducer from "./reducers/GlobalDashboardReducer";
import LoginReducer from "./reducers/LoginReducer";
import PurchaseBondReducer from "./reducers/PurchaseBondReducer";
import PurchazedBondsReducer from "./reducers/PurchazedBondsReducer";
import SignUpReducer from "./reducers/SignUpReducer";
import StackedListReducer from "./reducers/StackedListReducer";
import StatsReducer from "./reducers/StatsReducer";
import UnAuthorizeUserReducer from "./reducers/UnAuthorizeUserReducer";
import UserDashboardReducer from "./reducers/UserDashboardReducer";
import UserDataReducer from "./reducers/UserDataReducer";
import ValidateUserListReducer from "./reducers/ValidateUserListReducer";
import ValidateUserReducer from "./reducers/ValidateUserReducer";
import SearchUsersReducer from "./reducers/SearchUsersReducer";
import SearchBondsReducer from "./reducers/SearchBondsReducer";
import SaveStatusRerducer from "./reducers/SaveStatusReducer";
const rootReducer=combineReducers({
    login:LoginReducer,
    signUp:SignUpReducer,
    change_Password:ChangePasswordReducer,
    g_dashboard:GlobalDashboardReducer,
    bond:PurchaseBondReducer,
    valid_user:ValidateUserListReducer,
    user_valid:ValidateUserReducer,
    purchaze_bond:PurchazedBondsReducer,
    stacked_list:StackedListReducer,
    admin_stats:StatsReducer,
    user_dashboard:UserDashboardReducer,
    user_data:UserDataReducer,
    un_authorize:UnAuthorizeUserReducer,
    search_users:SearchUsersReducer,
    search_bonds:SearchBondsReducer,
    status:SaveStatusRerducer
})

export default rootReducer