import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../layout/Spinner'
import PropTypes from 'prop-types'
import { getPostById } from '../../../actions/postAction'
import Footer from '../../layout/Footer'
import BlogNavBar from '../../layout/BlogNavBar/BlogNavBar'


const PostDetail = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    const id = match.params.id
    getPostById(id)
  }, [])

  return loading ? (<Spinner />) : (
    <Fragment>
      <div className="container">
            <BlogNavBar />
        <article>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">

                <h2 className="section-heading">{post != null ? post.title : ''}</h2>
                <img className="img-fluid" src={(post != null) ? `../../images/` + post.PostImg : ''} className="card-img" alt="..." style={{ width: '720px', height: '480px' }} alt="" />
                {/* <p>{post != null ? post.description : ''}</p> */}
                <p dangerouslySetInnerHTML={{
                  __html: post != null ? post.description : ''}}></p>
              </div>
              {/* HTML
              <div
                dangerouslySetInnerHTML={{
                  __html: post != null ? post.description : ''
                }}></div> */}
            </div>
          </div>
        </article>
        <hr />
      <Footer/>
        </div>
    </Fragment>
  )
}

PostDetail.protoTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPostById })(PostDetail)
