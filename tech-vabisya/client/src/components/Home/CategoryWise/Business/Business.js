import React,{useEffect,Component} from 'react'
import { connect } from 'react-redux'
import Spinner from '../../../layout/Spinner'
import PropTypes from 'prop-types'
import {getLatestBusiness} from '../../../../actions/postAction'
import PostItem from '../PostItem'

const Business = ({getLatestBusiness,post:{busiposts,loading}}) => {

    useEffect(()=>{
        console.log('USE EFFECT OF BUSI::: ')
        
        getLatestBusiness()
    },[])

    return loading?(<Spinner/>):(<ul>
         <h6>Business</h6>
        {busiposts.length>0?(busiposts.map(singlePost=>(
            <PostItem key={singlePost.id} singlePost={singlePost}/>
        ))):(<h4>no business blogs found</h4>)}
        </ul>
    )
    // return <Spinner/>
}

Business.propTypes={
    post: PropTypes.object.isRequired,
    getLatestBusiness: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post : state.post    
})

export default connect(mapStateToProps,{getLatestBusiness}) (Business);