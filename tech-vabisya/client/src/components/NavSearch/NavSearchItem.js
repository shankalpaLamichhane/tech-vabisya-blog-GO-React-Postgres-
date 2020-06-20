import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavSearchItem = ({ searchItem: {
    id, title, PostImg, category, createdOn
} }) => {

    return (
        <li>
            <div class="card" style={{ padding: '5px', listStyleType: 'none', margin: '5px' }}>
                <div class="row ">
                    <div class="col-md-4">
                        <img src={`./images/${PostImg}`} class="w-100" />
                    </div>
                    <div class="col-md-8 px-3">
                        <div class="card-block px-3">
                            <h6 className="card-title">{title}</h6>
                            <Link to={`/posts/${id}/detail`}>
                                <small>Read More</small>
                            </Link>
                            <hr/>
                            <small>On {createdOn}</small>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    )
}

export default NavSearchItem