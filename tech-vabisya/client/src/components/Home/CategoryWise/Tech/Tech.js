import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../../../layout/Spinner'
import PropTypes from 'prop-types'
import {getLatestTech} from '../../../../actions/postAction'
import PostItem from '../PostItem'

const Tech = ({getLatestTech,post:{techposts,loading}}) => {

    useEffect(()=>{
        console.log('USE EFFECT OF TECH::: ')
        
        getLatestTech()
    },[])

    return loading?(<Spinner/>):(<ul>
        <h6>Tech</h6>
        {techposts.length>0?(techposts.map(singlePost=>(
            <PostItem key={singlePost.id} singlePost={singlePost}/>
        ))):(<h4>no tech blogs found</h4>)}
        </ul>
    )
    // return <Spinner/>
}

Tech.propTypes={
    post: PropTypes.object.isRequired,
    getLatestTech: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post : state.post    
})

export default connect(mapStateToProps,{getLatestTech}) (Tech);