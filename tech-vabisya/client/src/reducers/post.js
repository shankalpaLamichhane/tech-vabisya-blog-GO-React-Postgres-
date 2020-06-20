import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LIST_POST_SUCCESS,
    LIST_POST_FAILURE,
    LIST_TECH_POST_SUCCESS,
    LIST_TECH_POST_FAILURE,
    LIST_FOOD_POST_SUCCESS,
    LIST_FOOD_POST_FAILURE,
    LIST_BUSI_POST_SUCCESS,
    LIST_BUSI_POST_FAILURE,
    DETAIL_POST_FAILURE,
    DETAIL_POST_SUCCESS
} from '../actions/types'
import Axios from 'axios';

const initialState = {
    post: null,
    loading: true,
    posts: [],
    errors: {},
    pagination: {},
    techposts: [],
    foodposts: [],
    busiposts: [],
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST_SUCCESS:
            return {
                ...state,
                post: payload,
                loading: false,
                pagination: {
                    current: payload.currentPage,
                    pageSize: payload.pageSize,
                    total: payload.totalRecord,
                    totalPage: payload.totalPage,
                }
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.error
            }
        case LIST_POST_SUCCESS:
            return {
                ...state,
                posts: payload,
                loading: false,
                errors: {},
                pagination: {
                    current: payload.currentPage,
                    pageSize: payload.pageSize,
                    total: payload.totalRecord,
                    totalPage: payload.totalPage,
                }
            }
        case LIST_POST_FAILURE:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case DETAIL_POST_SUCCESS:
            return {
                ...state,
                loading:false,
                post: payload,
                errors: {},
            }
        case DETAIL_POST_FAILURE:
                return {
                    ...state,
                    loading: false,
                    errors: payload
                }
        case LIST_FOOD_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                foodposts: payload
            }
        case LIST_FOOD_POST_FAILURE:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case LIST_TECH_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                techposts:payload
            }
        case LIST_TECH_POST_FAILURE:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case LIST_BUSI_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                busiposts: payload
            }
        case LIST_BUSI_POST_FAILURE:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default:
            return state;
    }
}