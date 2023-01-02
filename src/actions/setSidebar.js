import { set } from "../constant/actionTypes";

export const setSidebar = (value) => {
    return{
        type:set,
        data:value
    }
}