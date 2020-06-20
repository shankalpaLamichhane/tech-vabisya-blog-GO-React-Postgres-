import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TableData = ({
    id,
    item,
    index
}) => {

    console.log('THE PROPS IN TABLE DATA -> > ' + id + '::: ' + JSON.stringify(item))

    return (


        <tr>
            <td>{index}</td>
            <td>{item.userId}</td>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.userType}</td>
            <td>{item.roleId}</td>
            <td><a class="btn btn-default">
                <Link to={`/users/${item.id}/edit`} title="Edit">
                    Edit
    </Link>
            </a>    </td>
        </tr>
    )

}

TableData.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.post
})


export default connect(mapStateToProps)(TableData);