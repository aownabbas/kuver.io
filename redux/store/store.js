import {createStore,applyMiddleware } from "redux";
import rootReducer from "../rootReducer";

const ReduxThunk=require("redux-thunk").default;
const middlewares=[];
middlewares.push(ReduxThunk)
export const store=createStore(rootReducer, applyMiddleware(...middlewares));