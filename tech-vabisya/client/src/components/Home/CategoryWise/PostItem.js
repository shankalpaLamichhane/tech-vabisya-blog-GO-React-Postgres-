import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const PostItem = ({
    singlePost:{
        id,
        title,
        category,
        PostImg,
        createdOn
    }
}) => {

return (
<li>
<div class="card" style={{padding:'5px',listStyleType:'none',margin:'5px'}}>
      <div class="row ">
        <div class="col-md-4">
            <img src={`./images/${PostImg}`} class="w-100"/>
          </div>
          <div class="col-md-8 px-3">
            <div class="card-block px-3">
             <small className="card-title">{title.length>35?title.substr(0,35)+'...':title}</small>
                               <Link to ={`/posts/${id}/detail`}>
            {'     '}<small>Read More</small>
                 </Link>
            </div>
          </div>

        </div>
        </div>
</li>
)
    
// {/* <div className="card">
//     <div className="row ">
//         <div className="col-md-2">
//             <img src="https://buzz-caribbean.com/app/uploads/2020/03/coronavirus-buzz-demo.jpg" />
//         </div>
//         <div className="col-md-12 px-3">
//             <div className="card-block px-2">
// <h6 className="card-title">{title}</h6>

//             </div>
//         </div>

//     </div>
// </div> */}

    PostItem.propTypes = {
        post:PropTypes.object.isRequired
    }
}

export default PostItem;