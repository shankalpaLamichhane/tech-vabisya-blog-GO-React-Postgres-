
import React from 'react';

const Header = () => {
  return(
    <header id="header">
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <h1><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard <small>Manage Your Site</small></h1>
        </div>
        <div className="col-md-2">
          <div className="dropdown create">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Create Content
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a type="button" data-toggle="modal" data-target="#addPage">Add Page</a></li>
              <li><a href="#">Add Post</a></li>
              <li><a href="#">Add User</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header;