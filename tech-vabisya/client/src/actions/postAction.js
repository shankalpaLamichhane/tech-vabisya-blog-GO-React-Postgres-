import axios from 'axios';
import { setAlert } from './alert';
import { push } from 'connected-react-router';

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  LIST_POST_SUCCESS,
  LIST_POST_FAILURE,
  LIST_TECH_POST_SUCCESS,
  LIST_TECH_POST_FAILURE,
  LIST_FOOD_POST_SUCCESS,
  LIST_FOOD_POST_FAILURE,
  LIST_BUSI_POST_SUCCESS,
  LIST_BUSI_POST_FAILURE,
  CLEAR_POST,
  DETAIL_POST_SUCCESS,
  DETAIL_POST_FAILURE,
} from './types';


const url = 'http://localhost:8080/v1/posts';
// Add Post
export const addPost = (formData={}) => async dispatch => {

  console.log('THE FORM DATA FROM COMPONENTIS ::: '+JSON.stringify(formData.formData))

  console.error('random')

  const dat = new FormData()
  dat.append('title',formData.title)
  dat.append('description',formData.description)
  dat.append('category',formData.category)
  dat.append('formId',formData.formId)
  dat.append('postImg',formData.file)

  try{
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }

  const res = await axios.post(url,dat,config);

  dispatch({
    type: ADD_POST_SUCCESS,
    payload: res.data,
  });

  dispatch(setAlert('Added Successfully','success',2000))

  dispatch(push({pathname:'/posts'}))
} catch (err) {
  console.log('ERROR IS ::: '+JSON.stringify(err));
  const errors = err.response.data.error;

  if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  }

  dispatch({
    type: ADD_POST_FAILURE,
    payload: { msg: err.response.statusText, status: err.response.status }
  });
  }
}

export const editPost = (formData={}) => async dispatch => {
  
  try{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const res = await axios.post(url,formData,config);

  dispatch({
    type: EDIT_POST_SUCCESS,
    payload: res.data,
  });

  dispatch(setAlert('Updated Successfully','success',2000))

  dispatch(push({pathname:'/serviceTypes'}))
} catch (err) {
  console.log('ERROR IS ::: '+JSON.stringify(err));
  const errors = err.response.data.error;

  if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  }

  dispatch({
    type: EDIT_POST_FAILURE,
    payload: { msg: err.response.statusText, status: err.response.status }
  });
  }
}


 // Get Service Type Detail
 export const getPostById= (id) => async  dispatch =>{
  
  try{
  const res = await axios.get(url+'/'+id);

  dispatch({
        type: DETAIL_POST_SUCCESS,
        payload: res.data.data
    });
    console.log('DISPATCH SUCCESS')
  }catch(err){
    dispatch({
      type: DETAIL_POST_FAILURE,
      payload: { msg: err, status: err }
    });
  }
};


export const searchPost = (formData={}) => async dispatch =>{
    
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const res = await axios.post(url+'/search',formData,config);

  console.log('THE API IS HIT OF LATEST SEARCH AND RESPONSE IS '+JSON.stringify(res.data.data))
    
    dispatch({
      type: LIST_POST_SUCCESS,
      payload: res.data.data
  })

  console.log('DISPATCH SUCCESS')

} catch (err) {
  console.log('ERR IS ::: '+JSON.stringify(err))
  dispatch({
    type: LIST_POST_FAILURE,
    payload: { msg: err, status: err }
  });
}
};
   
export const searchPostFromSearchBar = (formData={}) => async dispatch =>{
    
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    console.log('NOW HITTING THE API')

    const res = await axios.post(url+'/search',formData,config);

    console.log('THE API IS HIT')

  // console.log('THE API IS HIT OF LATEST SEARCH AND RESPONSE IS '+JSON.stringify(res.data.data))
    

    dispatch({
      type: LIST_POST_SUCCESS,
      payload: res.data.data
  })

  console.log('DISPATCH SUCCESS')

} catch (err) {
  console.log('ERR IS ::: '+JSON.stringify(err))
  dispatch({
    type: LIST_POST_FAILURE,
    payload: { msg: err, status: err }
  });
}
};

export const getLatestTech = () => async dispatch => {
  try{
    const res = await axios.get(url+'/lat/tech')
    console.log('THE API IS HIT OF LATEST TECH AND RESPONSE IS '+JSON.stringify(res.data.data))
    dispatch({
      type: LIST_TECH_POST_SUCCESS,
      payload: res.data.data
    });
  }catch(err){
    dispatch({
      type: LIST_TECH_POST_FAILURE,
      payload: {msg:err,status:err}
    })
  }
}

export const getLatestBusiness = () => async dispatch => {
  try{
    const res = await axios.get(url+'/lat/busi')

    dispatch({
      type: LIST_BUSI_POST_SUCCESS,
      payload: res.data.data
    });
  }catch(err){
    dispatch({
      type: LIST_BUSI_POST_FAILURE,
      payload: {msg:err,status:err}
    })
  }
}

export const getLatestFood = () => async dispatch => {
  try{
    const res = await axios.get(url+'/lat/food')

    dispatch({
      type: LIST_FOOD_POST_SUCCESS,
      payload: res.data.data
    });
  }catch(err){
    dispatch({
      type: LIST_FOOD_POST_FAILURE,
      payload: {msg:err,status:err}
    })
  }
}

export const clearPost = () => {
  return {
    type: CLEAR_POST,
  }
}