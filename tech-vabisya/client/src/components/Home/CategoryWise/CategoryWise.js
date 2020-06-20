import React, { Fragment } from 'react'
import Tech from './Tech/Tech'
import Business from './Business/Business'
import Food from './Food/Food'
const CategoryWise = () => {

    return (
        <Fragment>
            <h3>Posts According to Category</h3>
            <div className="category-wise container">
                <Tech />
                <Business />
                <Food />
            </div>
        </Fragment>
    )
}
export default CategoryWise;