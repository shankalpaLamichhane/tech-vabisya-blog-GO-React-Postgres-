import React, { useEffect ,Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../layout/Spinner'
import NavSearchItem from '../../NavSearch/NavSearchItem'
import BlogNavBar from '../../layout/BlogNavBar/BlogNavBar'

const CustomSearch = ({post: { posts, loading } }) => {

    return loading && posts.data == null ? (<Spinner />) : (
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

CustomSearch.propTypes = {
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps)(CustomSearch)