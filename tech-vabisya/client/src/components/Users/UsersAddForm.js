import React, { useEffect, useState,Fragment } from 'react'
import SideNav from '../layout/SideNav'
import { getAllRoles, clearRole } from '../../actions/roleAction'
import { addUser } from '../../actions/userAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

const UserAddForm = props => {

    const { roles, loading } = props.role;

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        userType: '',
        roleId: '',
        fullName: '',
        email: ''
    })

    useEffect(() => {
        props.getAllRoles()
        console.log('THE PROPS IS ::: ' + JSON.stringify(props))

        // setFormData({
        //     ...formData,
        //     roleId:!loading&&roles!=null?roles[0].id:''
        // })

        return () => {
            props.clearRole();
        }
    }, [])

    const { userId, password, confirmPassword, userType, roleId, fullName, email } =
        formData;

    const onChange = e => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        props.addUser(formData)
    }

    // console.log('THE PROPS IS ::: ' + JSON.stringify(props.role.roles[0].id))

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
                                        <div className="panel panel-default">
                                            <h3 className="panel-title">Add New User</h3>
                                            <div className="panel-body">
                                                <br />
                                                <form onSubmit={e => onSubmit(e)}>
                                                    <div className="form-group">
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
                                                    <div className="form-group">
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
                                                    <div className="form-group">
                                                        <label for="password">Password</label>
                                                        <input type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            value={password}
                                                            onChange={e => onChange(e)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="confirmPassword">Retype password</label>
                                                        <input type="password"
                                                            className="form-control"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            value={confirmPassword}
                                                            onChange={e => onChange(e)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
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
                                                            className="form-control"
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
                                                            className="form-control"
                                                            onChange={e => onChange(e)}
                                                            required>
                                                            {roles.map(item => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                        </select>

                                                    </div>

                                                    <button type="submit" className={`btn btn-success`} style={{ margin: '10px' }}>Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

UserAddForm.propTypes = {
    role: PropTypes.object.isRequired,
    getAllRoles: PropTypes.func.isRequired,
    clearRole: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    role: state.role
})

export default connect(mapStateToProps, { getAllRoles, clearRole, addUser })(UserAddForm);