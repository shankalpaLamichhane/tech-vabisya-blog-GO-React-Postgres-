import axios from 'axios';

import {LIST_ROLE_SUCCESS,LIST_ROLE_FAILURE,CLEAR_ROLE} from './types'

const url = 'http://localhost:8080/v1/roles'

export const getAllRoles = () => async dispatch => {
    try{
        const res = await axios.get(url);
    
        dispatch({
            type: LIST_ROLE_SUCCESS,
            payload: res.data.data
        })
    console.log('DISPATCH SUCCESS')
    }catch(err){
        console.log('ERR OCCURED'+JSON.stringify(err))
        dispatch({
            type:LIST_ROLE_FAILURE,
            payload: {msg:err,status:err}
        })
    }
}

export const clearRole = () => {
    return {
        type: CLEAR_ROLE,
    }
}