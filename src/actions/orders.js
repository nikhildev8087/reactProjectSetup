import { SET_ORDERS } from "../constant/actionTypes";

export const setOrder = (values) => {
    return{
        type:SET_ORDERS,
        data:values
    }
}