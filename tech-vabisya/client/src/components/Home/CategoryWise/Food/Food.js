import React,{useEffect,Component} from 'react'
import { connect } from 'react-redux'
import Spinner from '../../../layout/Spinner'
import PropTypes from 'prop-types'
import {getLatestFood} from '../../../../actions/postAction'
import PostItem from '../PostItem'

const Food = ({getLatestFood,post:{foodposts,loading}}) => {

    useEffect(()=>{
        console.log('USE EFFECT OF TECH::: ')
        
        getLatestFood()
    },[])

    return loading?(<Spinner/>):(<ul>
         <h6>Food</h6>
        {foodposts.length>0?(foodposts.map(singlePost=>(
            <PostItem key={singlePost.id} singlePost={singlePost}/>
        ))):(<h4>no food blogs found</h4>)}
        </ul>
    )
    // return <Spinner/>
}

Food.propTypes={
    post: PropTypes.object.isRequired,
    getLatestFood: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post : state.post    
})

export default connect(mapStateToProps,{getLatestFood}) (Food);