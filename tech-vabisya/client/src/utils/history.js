import {createHashHistory as createHistory} from 'history';

const history = createHistory({
    hashType: 'slash'
})

export default history;