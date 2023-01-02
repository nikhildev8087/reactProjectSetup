import { SET_USERS } from "../constant/actionTypes";

export const setUser = (value) => {
    return{
        type:SET_USERS,
        data:value,
    }
}

