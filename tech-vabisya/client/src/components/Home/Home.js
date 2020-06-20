import React, { Fragment, useState,useEffect } from 'react'
import './home.css'
import BlogNavBar from '../layout/BlogNavBar/BlogNavBar'
import LatestSearch from './LatestSearch/LatestSearch'
import CategoryWise from './CategoryWise/CategoryWise'
import SearchBar from './Searchbar/SearchBar'
import Footer from '../layout/Footer'

const Home = () => {

    return (
        <Fragment>
        <div className="container">
            <BlogNavBar/>
        <SearchBar/>
            <div className="content">
                <div className="interchangeable">
                        <LatestSearch />
                        <CategoryWise/>
                </div>
                {/* main latest */}
                <div className="adv">
                    <img src="https://s3.envato.com/files/179288362/5.jpg" style={{width:'130px',height:'90vh',marginLeft:'20px'}}></img>
                </div>
            </div>
        <Footer/>
        </div>
        </Fragment>
    )
}




export default Home;