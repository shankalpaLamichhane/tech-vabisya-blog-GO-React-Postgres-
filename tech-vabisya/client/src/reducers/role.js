import {
    LIST_ROLE_SUCCESS,
    LIST_ROLE_FAILURE
}from '../actions/types'

const initialState = {
    roles : [],
    role : null,
    loading: true,
    errors :{},
}

export default function(state=initialState,action){
    const {type,payload} = action;

    switch(type){
        case LIST_ROLE_SUCCESS:
            return{
                ...state,
                roles:payload,
                loading: false,
            }
        case LIST_ROLE_FAILURE:
            return{
                ...state,
                loading: false,
                errors: action.error
            }
        default:
            return state;
    }
}