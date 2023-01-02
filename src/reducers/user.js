import { SET_USERS } from "../constant/actionTypes";

const initial_state = {
    users : [],
};

export default (state = initial_state, action) => {
    switch(action.type){
        case SET_USERS:
            return { ...state, users: action.data};

        default:
            return{...state};
    }
};