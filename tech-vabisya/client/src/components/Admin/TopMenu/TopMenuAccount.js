import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../actions/auth'

function TopMenuAccount(props) {

  const email = "some@any.com";
  const [isShow, setShow] = useState(false);

  // const handleLogout = (e)=>{
    
  //   logout();
  // }

  return (

    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{email}</span>
        <img className="img-profile rounded-circle" alt=""
          src="https://us.123rf.com/450wm/gmast3r/gmast3r1710/gmast3r171002485/88771602-stock-vector-avatar-profile-icon-male-faceless-user-on-colorful-round-background-flat-vector-illustration.jpg?ver=6" />
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a className="dropdown-item"
        onClick={()=>{
          props.logout()
        }}
        data-toggle="modal"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
};

TopMenuAccount.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null,{logout})(TopMenuAccount);
