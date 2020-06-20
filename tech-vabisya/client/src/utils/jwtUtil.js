import jwtDecode from 'jwt-decode'
import {getLocalStorage} from './storageUtil'
import {JWT_TOKEN} from '../constants/appConfig'

export let isTokenExpired = token => {
    try{
        const decoded = jwtDecode(token)
        console.log('DECODED TOKEN IS ::: '+JSON.stringify(decoded))
        if (decoded.expiryDate <Date.now()/1000){
            return true;
        }
        return false;
    }catch(e){
        console.log('EXCEPTION E '+JSON.stringify(e))
        return true;
    }
}

export let decodedUserName = token => {
    try{
        const decoded = jwtDecode(token)
        return decoded.userId;
    }catch(e){
        return null;
    }
}

export let getToken = () => {
    return getLocalStorage(JWT_TOKEN);
}

export let isUserAuthenticated = () => {
    console.log('CHECK GET TOKEN '+!!getToken())
    console.log('CHECK IF TOKEN EXPIRED '+isTokenExpired(getToken()))
    console.log('SO IS USER AUTHENTICATED ??? '+!!getToken() && !isTokenExpired(getToken()))
    return !!getToken() && !isTokenExpired(getToken())

}