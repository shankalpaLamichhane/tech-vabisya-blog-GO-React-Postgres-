import React, { Fragment } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";
import Notifications from '../../components/Common/Notification'
import TopMenu from './TopMenu/TopMenu'
import { Switch, Route } from 'react-router'
import PrivateRoute from '../routing/PrivateRoute'
import Home from './Home/Home'
import PostAddForm from '../../components/Post/PostAddForm'
import PostList from '../../components/Post/PostList'
// import PostDetail from '../../components/Post/'
import PostEditForm from '../../components/Post/PostEditForm'
import UserAddForm from '../../components/Users/UsersAddForm'
import UserEditForm from '../../components/Users/UserEditForm'
import UserList from '../../components/Users/UserList'

const Admin = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
