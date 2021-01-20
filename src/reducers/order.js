import { ACTION_TYPES } from "../actions/order";

const initialState = {
    list:[]
}

export const order = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_LOGIN:
        case ACTION_TYPES.FETCH_ALL:
        case ACTION_TYPES.FETCH_STORE:
            return {
                ...state,
                list:[...action.payload]
            }
    
        default:
            return state;
    }
}