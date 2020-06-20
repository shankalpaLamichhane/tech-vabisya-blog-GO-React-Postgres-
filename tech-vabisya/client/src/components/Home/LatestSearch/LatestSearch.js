import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../layout/Spinner'
import { searchPost } from '../../../actions/postAction'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TopPosts from './TopPosts'


const LatestSearch = ({ searchPost, post: { posts, loading, pagination } }) => {


  console.log('THE PROPS WITHOUT LOADING CHECK IS ::: ' + JSON.stringify(posts))

  if (!loading) {
    console.log('THE PROPS AFTER LOADING IS ::: ' + JSON.stringify(posts))

  }

  useEffect(() => {
    console.log('USE EFFECT OF LATEST SEARCH::: ')
    searchPost({ sortParameter: 'ASC' });
  }, [])

  return (loading && posts.data != null) ? (<Spinner></Spinner>) : (
    <div className="latest-search">
      {/* <div className="card bg-dark text-white">
            <img src="https://s.france24.com/media/display/2b0654bc-3c59-11ea-8547-005056a98db9/w:1240/p:16x9/08617755df20ee27e7e21f6209e8bef8cccd8399.jpg" className="card-img" alt="..." />
            <div className="card-img-overlay">
                {console.log('THE POSTS INSIDE LATEST SEARCH IS :::'+JSON.stringify(posts))}
                <h5 className="card-title">{(posts.data!=null)?posts.data[0].title:"Loading"}</h5>
    <p className="card-text">{(posts.data!=null)?posts.data[0].description.substr(0,65):"Loading"}</p>
                <p className="card-text">Last updated 3 mins ago</p>
                    <Link to={`posts/${(posts.data!=null)?posts.data[0].id:"Loading"}`} className='btn btn-primary'>Read more</Link>
            </div>
        </div> */}

      <div class="row featurette container" style={{ display: 'flex', flexDirection: 'row',justifyContent:'flex-start' }} >
        <div class="col-md-3 order-md-2">
          <h5>{(null!=posts.data  && posts.data.length>0) ? posts.data[0].title : "Loading"}</h5>
          <p dangerouslySetInnerHTML={{
                  __html: (null!=posts.data &&posts.data.length>0)?posts.data[0].description.substring(0,100) : ''}}></p>
          <Link to={`posts/${(null != posts.data && posts.data.length>0) ? posts.data[0].id : "Loading"}/detail`}>Read more</Link>
        </div>
        <div class="col-md-9 order-md-1">
          <img class="featurette-image img-fluid mx-auto" src={(null != posts.data && posts.data.length>0) ? `./images/` + posts.data[0].PostImg : ''} className="card-img" alt="Generic placeholder image" style={{ width: '580px', height: '280px' }} />
        </div>
      </div>
      <hr/>

      {/* <div className="secondary"> */}
      <div class="container" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="section" style={{ display: 'flex', flexDirection: 'row' }}>
          {(posts.data != null) ? (posts.data.slice(0, 3).map((post) =>
            <TopPosts post={post} loading={loading} />
          )) :
            <Spinner></Spinner>}
        </div>

        <div className="section" style={{ display: 'flex', flexDirection: 'row' }}>
          {(posts.data != null) ? (posts.data.slice(2, 5).map((post) =>
            <TopPosts post={post} loading={loading} />
          )) :
            <Spinner></Spinner>}
        </div>

      </div>
    </div>

  )
}

LatestSearch.propTypes = {
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { searchPost })(LatestSearch);
