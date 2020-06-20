import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Login from '../auth/Login';
import PostEditForm from '../Post/PostEditForm'
import NavSearch from '../NavSearch/NavSearch'
import CustomSearch from '../Home/Searchbar/CustomSearch'
import Home from '../Home/Home'
import PostDetail from '../Home/PostDetail/PostDetail';

const Routes = () => {
    return (
        // <section className='container'>
            // <Alert/>
            <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/trending' component={NavSearch}/>
            <Route exact path='/tech' component={NavSearch}/>
            <Route exact path='/busi' component={NavSearch}/>
            <Route exact path='/food' component={NavSearch}/>
            <Route exact path='/custom-search' component={CustomSearch}/>
            <Route exact path='/posts/:id' component={PostDetail}/>
            <Route exact path='/' component={Home}/>
            </Switch>
        // </section>
    )
}

export default Routes;