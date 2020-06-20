import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchPost } from '../../actions/postAction'
import Spinner from '../../components/layout/Spinner'
import TableData from './TableData'
import Pagination from '../Common/Pagination'
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

const PostList = ({ searchPost, post: { posts, pagination, loading } }) => {

    const [searchParameter, setSearchParameter] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(5)

    console.log('THE PAGINATION IS ::: ' + JSON.stringify(pagination))

    const formData = {
        sortParameter: 'DESC',
        sortField: '',
        currentPage: currentPage ? currentPage : 1,
        searchParameter: searchParameter,
        pageLimit: 10
    }

    useEffect(() => {
        searchPost({ sortParameter: 'DESC' });
    }, [searchPost, loading])

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        formData.currentPage = pageNumber;
        searchPost(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('HANDLE SUBMIT CALLED')
        console.log('THE FORM DATA IS ::: ' + JSON.stringify(formData))
        searchPost(formData)
    }

    const handleChange = e => {
        setSearchParameter(e.target.value)
        console.log('ONCHANGE  -> THE SEARCH PARAMETER IS ::: ' + searchParameter)
    }

    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    console.log('POSTS IS ' + JSON.stringify(posts))
    const { current, pageSize, total } = pagination;

    // return loading?<Spinner/>:<div>{JSON.stringify(posts)}</div>

    return (
        loading || null == posts || null == posts.data ? <Spinner /> :

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
                                            <th>Title {}</th>
                                            <th>Category</th>
                                            <th>Created On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts != null && posts.data !== null && posts.data.length > 0 ?
                                            (
                                                posts.data.map((item, index) => (
                                                    <TableData key={item.id} item={item} index={(posts.currentPage - 1) * (posts.pageSize) + index + 1} />
                                                ))
                                            )
                                            : (<h4>No service Types found</h4>)
                                        }
                                    </tbody>
                                </table>
                                <Pagination
                                    recordsPerPage={pagination.pageSize}
                                    totalRecords={posts != null ? pagination.total : 10}
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

PostList.propsTypes = {
    searchPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { searchPost })(PostList)