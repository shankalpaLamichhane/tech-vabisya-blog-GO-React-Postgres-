

import React from 'react';
import {Link,Redirect} from 'react-router-dom';

const SideNav = () => {
    return(
    <div className="col-md-3">
    <div className="list-group">
      <a href="index.html" className="list-group-item active main-color-bg">
        <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
      </a>
      <Link to='/users/new' className="list-group-item">
          <span className="glyphicon glyphicon-list-alt"
           aria-hidden="true"></span> Users
            <span className="badge">12</span>
      </Link>
      
      <Link to='/posts/new' className="list-group-item">
          <span className="glyphicon glyphicon-pencil"
           aria-hidden="true"></span> Posts
            <span className="badge">12</span>
      </Link>

      <a href="users.html" className="list-group-item"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Users <span className="badge">203</span></a>
    </div>

    <div className="well">
      <h4>Disk Space Used</h4>
      <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
              60%
      </div>
    </div>
    <h4>Bandwidth Used </h4>
    <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
            40%
    </div>
  </div>
    </div>
  </div>
)
}

export default SideNav;