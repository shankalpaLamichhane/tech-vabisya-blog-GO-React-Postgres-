import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../../actions/auth';
import Alert from '../layout/Alert';
import {isUserAuthenticated} from '../../utils/jwtUtil'


const Login = ({ loginAction, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    })

    const { userName, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        loginAction(userName,password);
    }


    return isUserAuthenticated()?<Redirect to='/admin' />:(
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                      </div>
                      <form className="user" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
  
                          <input id="userName"
                            field="userName"
                            value={userName}
                            onChange={e=>onChange(e)}
                            required={true}
                            maxLength={100}
                            label="userName"
                            name="userName"
                            className="form-control"
                            placeholder="userName" />
                        </div>
                        <div className="form-group">
                          <input id="password"
                            field="password"
                            value={password}
                            onChange={e=>onChange(e)}
                            required={true}
                            maxLength={100}
                            className="form-control"
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="Password" />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label"
                              htmlFor="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <button
                          className={`btn btn-primary btn-user btn-block`}
                          type="submit">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginAction })(Login);