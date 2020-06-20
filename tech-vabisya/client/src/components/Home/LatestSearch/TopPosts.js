import React, { Fragment } from 'react'
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom'

const TopPosts = ({ post, loading }) => {
  // console.log('THE POST IS ::: '+JSON.stringify(post))  
  return (
    loading || post == null ? (<Spinner />) : (
      <div class="container">
        <div class="card-columns" style={{ display: 'flex', flexDirection: 'column' }}>
          <div class="view overlay">
            <img class="card-img-top" src={`./images/` + post.PostImg} alt="Card image cap" style={{ width: '280px', height: '190px' }} />
          </div>

          <div class="card-body">

            <h5 class="card-title font-weight-bold"><a>{post.title}</a></h5>
            <p dangerouslySetInnerHTML={{
              __html: post != null ? post.description.substring(0, 100) : ''
            }} class="card-text"></p>
            <a href="">
              <div class="mask rgba-white-slight"><Link to={`/posts/${post != null ? post.id : 'id'}/detail`}>... Read More</Link></div>
            </a>

          </div>
        </div>
      </div>

    )
  )
}

export default TopPosts;