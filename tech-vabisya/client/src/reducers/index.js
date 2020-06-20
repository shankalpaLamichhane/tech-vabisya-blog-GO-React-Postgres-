import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import role from './role';
import user from './user'

export default combineReducers({
    alert,
    auth,
    post,
    role,
    user
});