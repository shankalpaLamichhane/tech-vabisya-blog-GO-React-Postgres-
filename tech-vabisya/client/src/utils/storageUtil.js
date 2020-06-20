/**
 * Store string record in the storage
 *
 * @param {string} key
 * @param {string | array | object} value
 */


export let setLocalStorage = (key,value) => {
    if(value && typeof(value) === 'string'){
        localStorage.setItem(key,value)
    }else{
        localStorage.setItem(key,JSON.stringify(value))
    }
};

/**
 * get record from storage using the key
 */

 export let getLocalStorage = (key) =>{
     const data = localStorage.getItem(key);
     try{
         return JSON.parse(data)
     }catch(e){
         return data;
     }
 }

 /**
  * remove items from the storage using the key
  */

export let clearLocalStorage = (key) => localStorage.removeItem(key);