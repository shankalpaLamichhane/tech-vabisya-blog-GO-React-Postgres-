import {
    LIST_USER_SUCCESS,
    LIST_USER_FAILURE,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    DETAIL_USER_SUCCESS,
    DETAIL_USER_FAILURE,
} from '../actions/types'

const initialState = {
    users: [],
    user: null,
    loading: true,
    errors: {},
}

export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case ADD_USER_SUCCESS:
            return{
                ...state,
                user: payload,
                loading: false,
            }
        case ADD_USER_FAILURE:
            return{
                ...state,
                loading: false,
                errors: action.error
            }
        case LIST_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                users:payload,
                pagination:{
                    current: payload.currentPage,
                    pageSize: payload.pageSize,
                    total: payload.totalRecord,
                    totalPage: payload.totalPage,
                }
            }
        case LIST_USER_FAILURE:
            return {
                ...state,
                loading:false,
                errors: action.error
            }
        case DETAIL_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                user:payload,
            }
        case DETAIL_USER_FAILURE:
            return{
                ...state,
                loading:false,
                errors:action.error
            }
        default:
            return state;
    }
}

