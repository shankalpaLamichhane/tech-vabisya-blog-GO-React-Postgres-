import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };

  export default function (state=initialState,action){
      const {type,payload} = action;

      switch(type){
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
              localStorage.setItem('token', payload.token);
              return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
              };
              case REGISTER_FAIL:
                case LOGIN_FAIL:
                case LOGOUT:
                  localStorage.removeItem('token');
                  localStorage.removeItem('user-permission');
                  localStorage.removeItem('userId')
                  return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
                  };
              default:
                return state;
      }
  }