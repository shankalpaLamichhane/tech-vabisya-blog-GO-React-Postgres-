import React, { useEffect, useState,Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { searchUsers, clearUser } from '../../actions/userAction'
import Spinner from '../../components/layout/Spinner'
import TableData from './TableData'
import Pagination from '../Common/Pagination'
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

const UserList = ({ searchUsers, clearUser, user: { users, pagination, loading } }) => {
    const [searchParameter, setSearchParameter] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(5)

    const formData = {
        sortParameter: '',
        sortField: '',
        currentPage: currentPage ? currentPage : 1,
        searchParameter: searchParameter,
        pageLimit: 10
    }

    useEffect(() => {
        searchUsers(formData);
        return () => {
            clearUser();
        }
    }, [searchUsers, loading])

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        searchUsers(formData)
    }

    const handleSubmit = e => {
        e.preventDefault();
        searchUsers(formData)
    }

    const handleChange = e => {
        setSearchParameter(e.target.value)
    }

    const indexOfLastUsers = currentPage * recordsPerPage;
    const indexOfFirstUsers = indexOfLastUsers - recordsPerPage;
    // const {current,pageSize,total} = pagination;

    return (
        loading ? <Spinner /> :

            <Fragment>
                <Notifications />
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopMenu />
                        <div className="container-fluid">


                            <div className="table-responsive">
                                <div className="mb-3">
                                    <form onSubmit={handleSubmit} >
                                        <div className="col-md-6 d-flex flex-row">
                                            <input className="form-control" type="text" name="searchParameter" value={searchParameter}
                                                onChange={handleChange} placeholder="Filter Pages" />

                                            <input type="submit" value="Search"></input>
                                        </div>
                                    </form>
                                </div>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>S.N.</th>
                                            <th>UserId {}</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>User Type</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users != null && users.data.length > 0 ?
                                            (
                                                users.data.map((item, index) => (
                                                    <TableData key={item.id} item={item} index={(users.currentPage - 1) * (users.pageSize) + index + 1} />
                                                ))
                                            )
                                            : (<h4>No service Types found</h4>)
                                        }
                                    </tbody>
                                </table>
                                <Pagination
                                    recordsPerPage={pagination.pageSize}
                                    totalRecords={users != null ? pagination.total : 10}
                                    // totalRecords={10}
                                    paginate={paginate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    );
}

UserList.propsTypes = {
    searchUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { searchUsers, clearUser })(UserList)