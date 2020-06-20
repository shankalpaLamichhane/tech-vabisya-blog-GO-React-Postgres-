import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Routes from './components/routing/Routes';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute'

// REDUX
import { Provider } from 'react-redux';
import store from './store'


import './App.css';
import './styles/sb-admin-2.min.css'
import Admin from './components/Admin/Admin';


import NavSearch from './components/NavSearch/NavSearch'
import CategoryWise from './components/Home/CategoryWise/CategoryWise'
import CustomSearch from './components/Home/Searchbar/CustomSearch'
import Home from './components/Home/Home'
import PostDetail from './components/Home/PostDetail/PostDetail'


import PostAddForm from './components/Post/PostAddForm'
import PostList from './components/Post/PostList'
// import PostDetail from '../../components/Post/'
import PostEditForm from './components/Post/PostEditForm'
import UserAddForm from './components/Users/UsersAddForm'
import UserEditForm from './components/Users/UserEditForm'
import UserList from './components/Users/UserList'

function App() {
  return (
    <Provider store={store}>
      <div className="App" id="wrapper">
        <Router>
          <Fragment>
            <Switch>
              {/* <Route path="/" component={Routes} /> */}

              <Route exact path='/login' component={Login} />
            <Route exact path='/trending' component={NavSearch}/>
            <Route exact path='/tech' component={NavSearch}/>
            <Route exact path='/busi' component={NavSearch}/>
            <Route exact path='/food' component={NavSearch}/>
            <Route exact path='/custom-search' component={CustomSearch}/>
            <Route exact path='/posts/:id/detail' component={PostDetail}/>
            <Route exact path='/' component={Home}/>

              <PrivateRoute path='/posts/new' component={PostAddForm} />
              <PrivateRoute path='/posts' component={PostList} />
              {/* <PrivateRoute exact path='/posts/:id' component={PostDetail} /> */}
              <PrivateRoute path='/posts/:id/edit' component={PostEditForm} />
              <PrivateRoute path='/users/new' component={UserAddForm} />
              <PrivateRoute path='/users' component={UserList} />
              <PrivateRoute path='/users/:id/edit' component={UserEditForm} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path="/admin" component={Admin}>
              </PrivateRoute>
            </Switch>
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
