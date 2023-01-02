import { SET_ORDERS } from "../constant/actionTypes";

const initial_state = {
    orders:[],
};

export default (state = initial_state, action){
    switch (action.type){
        case SET_ORDERS:
            return {...state, orders: action.data };
        
        default:
            return{...state};
    }
};