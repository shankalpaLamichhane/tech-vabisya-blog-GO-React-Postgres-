import axios from 'axios'
import {setAlert} from './alert'

import {ADD_USER_SUCCESS,ADD_USER_FAILURE
    ,LIST_USER_SUCCESS,DETAIL_USER_SUCCESS
    ,LIST_USER_FAILURE,CLEAR_USER, DETAIL_USER_FAILURE,
    UPDATE_USER_SUCCESS,UPDATE_USER_FAILURE} from './types'

const url = 'http://localhost:8080/v1/users'

export const addUser = (formData={}) => async dispatch => {
    try{

        const res = await axios.post(url,formData)
    
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: res.data.data
        })

        console.log('DISPATCH SUCCESS')
    }catch(err){
        dispatch({
            type:ADD_USER_FAILURE,
            payload: {msg:err,status:err}
        })
    }
}

export const searchUsers = (formData={}) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        }

        const res = await axios.post(url+'/search',formData,config);

        dispatch({
            type:LIST_USER_SUCCESS,
            payload: res.data.data,
        })
    }catch(err){
        dispatch({
            type:LIST_USER_FAILURE,
            payload: {msg:err,status:err}
        })
    }
}

export const getUserById = id => async dispatch => {
    try{
        const res = await axios.get(url+`/${id}`)
        dispatch({
            type: DETAIL_USER_SUCCESS,
            payload: res.data.data
        })
    }catch(err){
        dispatch({
            type: DETAIL_USER_FAILURE,
            payload: {msg:err,status:err}
        });
    }
}

export const updateUser = (formData={},id) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        }
        const res = await axios.put(url+`/${id}`,formData,config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data.data
        })
    }catch(err){
        const error = err.response.data.message;

        if (error) {
           dispatch(setAlert(error, 'danger'));
        }
        console.log('ERR IS ::: '+JSON.stringify(err))
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: {msg:err,status:err}
        });
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER,
    }
}