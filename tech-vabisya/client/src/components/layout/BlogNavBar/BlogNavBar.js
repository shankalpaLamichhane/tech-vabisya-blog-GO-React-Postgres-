import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from './T-LOGO.png'

const BlogNavBar = () => {
  return (
    <nav class="navbar white navbar-expand-lg navbar-light ">
      <img src={logo} style={{width:'50px'}}/>
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"><Link to="/">Tech Vabisya</Link><span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/trending">Trending</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/tech">Technology</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/busi">Business</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/food">Food</Link></a>
          </li>
        </ul>
        <span class="navbar-text">
          Your daily tech dose
  </span>
      </div>
    </nav>

  )
}
export default BlogNavBar;