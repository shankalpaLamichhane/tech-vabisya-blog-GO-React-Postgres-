import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/T-LOGO.png'

const LeftMenu= () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);
    let [moduleActive,setModuleActive] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon icon-green rotate-n-15">
                        <img src={logo} width={'50px'}/>
                    </div>
                    <div className="sidebar-brand-text mx-3">Tech<sup>Vabisya</sup></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Warehouse
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/posts/new`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Posts</span>
                    </Link>
                    <ul>
                        <li>
                        <Link className="nav-link ml-4" to={`/posts/new`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>New</span>
                            </Link>
                        </li>
                        <li>
                        <Link className="nav-link ml-4" to={`/posts`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/users`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>Users</span>
                    </Link>
                    <ul>
                        <li>
                        <Link className="nav-link ml-4" to={`/users/new`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>New</span>
                            </Link>
                        </li>
                        <li>
                        <Link className="nav-link ml-4" to={`/users`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Admin
                </div>


                <li className="nav-item">
                    <Link className="nav-link" to={`/users`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Users</span>
                    </Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
