import React, { useEffect ,Fragment} from 'react'
import { searchPost } from '../../actions/postAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import NavSearchItem from './NavSearchItem'
import BlogNavBar from '../layout/BlogNavBar/BlogNavBar'

const NavSearch = ({ searchPost, location, post: { posts, loading } }) => {

    useEffect(() => {
        let category = location.pathname.replace('/', '')
        searchPost({ category: category, sortParameter: 'DESC' })
        console.log('THE POSTS IS ::: ' + JSON.stringify(posts) + 'LENGTH:::' + posts.length)
    }, [location])

    return loading && posts.data != null ? (<Spinner />) : (
        <Fragment>
              <div className="container">
            <BlogNavBar />
            <div className="container">
                <ul style={{ listStyleType: 'none' }}>
                    {(posts.data != null) && posts.data.length > 0 ? (posts.data.map(searchItem => (
                        <NavSearchItem key={searchItem.id} searchItem={searchItem} />
                    ))) : <h4>No Blogs Found According to criteria</h4>}
                </ul>
            </div>
            </div>
        </Fragment>

    )
}

NavSearch.propTypes = {
    searchPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { searchPost })(NavSearch)