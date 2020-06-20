import React, { Fragment, useEffect, useState } from 'react'
import Header from '../layout/Header'
import Navbar from '../layout/Navbar'
import SideNav from '../layout/SideNav';
import { getAllRoles, clearRole } from '../../actions/roleAction'
import { getUserById, clearUser, updateUser } from '../../actions/userAction'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

const UserEditForm = (props) => {

    const { roles } = props.role;
    const { user, loading } = props.user;

    const [formData, setFormData] = useState({
        userId: '',
        userType: '',
        roleId: '',
        fullName: '',
        email: ''
    })

    const { userId, userType, roleId, fullName, email } =
        formData;

    useEffect(() => {
        const id = props.match.params.id;
        props.getAllRoles();
        props.getUserById(id)
        setFormData({
            ...formData,
            userId: !loading && null != user ? user.userId : '',
            userType: !loading && user != null ? user.userType : '',
            roleId: !loading && user != null ? user.roleId : '',
            fullName: !loading && user != null ? user.fullName : '',
            email: !loading && user != null ? user.email : '',
        })
        return () => {
            props.clearUser();
            props.clearRole();
        }
    }, [loading
        , getAllRoles
        , getUserById, props.match])


    const onChange = e => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        const id = props.match.params.id;
        e.preventDefault();
        props.updateUser(formData, id)
    }

    return (
        loading && roles == null ? <Spinner></Spinner> :

            <Fragment>
                <Notifications />
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopMenu />
                        <div className="container-fluid">

                            <div className="col-xl-7 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h3 className="panel-title">Edit User</h3>
                                    </div>
                                    <div className="panel-body">
                                        <br />
                                        <form onSubmit={e => onSubmit(e)}>
                                            <div className="form-group col-md-6">
                                                <label for="userId">User Id</label>
                                                <textarea type="text"
                                                    className="form-control"
                                                    id="userId"
                                                    placeholder="userId"
                                                    name="userId"
                                                    value={userId}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="fullName">Full Name</label>
                                                <textarea type="text"
                                                    className="form-control"
                                                    id="fullName"
                                                    placeholder="Full Name"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="email">Email</label>
                                                <input type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="userType">User Type</label>
                                                <select id="userType"
                                                    placeholder="Select User Type"
                                                    name="userType"
                                                    value={userType}
                                                    defaultValue="admin"
                                                    onChange={e => onChange(e)}
                                                    required>
                                                    <option value="ADM">Admin</option>
                                                    <option value="CLI">Client</option>
                                                    <option value="SPA">Super Admin</option>
                                                </select>

                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="roleId">Role</label>
                                                <select id="roleId"
                                                    placeholder="Select the Role"
                                                    name="roleId"
                                                    defaultValue='someId'
                                                    value={roleId}
                                                    onChange={e => onChange(e)}
                                                    required>
                                                    {roles.map(item => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-success" style={{ margin: '10px' }}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

    )
}

UserEditForm.propTypes = {
    user: PropTypes.object.isRequired,
    role: PropTypes.object.isRequired,
    getAllRoles: PropTypes.func.isRequired,
    getUserById: PropTypes.func.isRequired,
    clearRole: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    role: state.role
})

export default connect(mapStateToProps,
    { getAllRoles, clearRole, updateUser, getUserById, clearUser })
    (UserEditForm);