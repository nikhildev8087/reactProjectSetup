import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import orders from "./orders";
import { SET_USER_LOGOUT } from "../constant/actionTypes";


const reudcers = combineReducers({
    auth,
    user,
    orders,
});

const rootReducer = (state, action) =>{
    if (action.type === SET_USER_LOGOUT) {
        state = undefined;
    }

    return reudcers(state,action);
};

export default rootReducer;