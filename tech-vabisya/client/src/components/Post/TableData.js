import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TableData = ({
    id,
    item,
    index
}) => {

    return (
        <tr>
            <td>{index}</td>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.createdOn}</td>
            <td><a class="btn btn-default">
                <Link to={`/posts/${item.id}/edit`} title="Edit">
                    Edit
                </Link>
            </a>
            </td>
        </tr>
    )

}


TableData.propTypes = {
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps)(TableData);