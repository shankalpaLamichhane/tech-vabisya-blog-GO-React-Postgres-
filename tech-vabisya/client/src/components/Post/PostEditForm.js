import React, { Fragment, useEffect, useState } from 'react'
import { getPostById, clearPost } from '../../actions/postAction'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Axios from 'axios'
import ModalImage from "react-modal-image";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

const PostEditForm = (props) => {

    const { post, loading } = props.post;

    const [formData, setFormData] = useState({
        title: ' ',
        category: ' ',
        description: ' ',
        file: null,
        formId: ' '
    })

    const { title, category, description, formId, file } = formData;

    useEffect(() => {
        const id = props.match.params.id;
        props.getPostById(id)
        console.log('THE POST AFTER API CALL IS ' + JSON.stringify(post))

        setFormData({
            ...formData,
            title: !loading && post != null ? post.title : '',
            category: !loading && post != null ? post.category : '',
            description: !loading && post != null ? post.description : '',
            formId: !loading && post != null ? post.formId : '',
        })

        console.log('THE FORM DATA SET AFTER API CALL IS ' + JSON.stringify(formData))

        return () => {
            props.clearPost();
        }



    }, [loading, getPostById, clearPost])


    const handleFile = (e) => {
        let file = e.target.files[0]
        setFormData({
            ...formData,
            file: file
        })
    }

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    };

    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
    ];

    const onChange = e => {
        if (typeof e === 'object') {
            console.log('ON CHANGE OBJECT ' + e.target.name)
            console.log(true)
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('INSIDE HANDLE SUBMIT FUNCTION')
        console.log('FORM DATA IS ::: ' + JSON.stringify(formData))
        console.log('FILE IS ' + file)
        console.log('CATEGORY IS ' + category)
        console.log('TITLE IS ' + title)
        console.log('description IS ' + description)
        console.log('FILE IS ' + file)

        let formDataToSubmit = new FormData()
        if (null != file) {
            formDataToSubmit.append('postImg', file)
        }
        formDataToSubmit.append('category', category)
        formDataToSubmit.append('description', description)
        formDataToSubmit.append('title', title)
        formDataToSubmit.append('formId', formId)

        console.log('THE FORM DATA TO SUBMIT IS ::: ' + JSON.stringify(formDataToSubmit))

        const id = props.match.params.id;

        Axios({
            url: `http://localhost:8080/v1/posts/${id}`,
            method: 'put',
            data: formDataToSubmit,
        })
        console.log('AFTER UPDATE POST')
    }


    const rteChange = (content, delta, source, editor) => {
        // console.log('RICH TEXT')
        // console.log(editor.getHTML()); // rich text
        // console.log('PLAIN TEXT')
        // console.log(editor.getText()); // plain text
        // console.log(editor.getLength()); // number of characters

        formData.description = editor.getHTML()
    }


    return loading || post == null ? <Spinner /> :
        (
            <Fragment>

                <Notifications />
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopMenu />
                        <div className="container-fluid">

                            <div className="col-xl-7 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h3 className="panel-title">Edit Post</h3>
                                        <div className="panel-body">

                                            <br />
                                            <form onSubmit={e => handleSubmit(e)}>
                                                <div className="form-group col-md-6">
                                                    <label for="formId">Form Id</label>
                                                    <select id="formId"
                                                        placeholder="Select the form"
                                                        className="form-control"
                                                        name="formId"
                                                        value={formId}
                                                        onChange={e => onChange(e)}
                                                    >
                                                        <option value="id1">Simple Form</option>
                                                        <option value="id2">Simple Form 2</option>
                                                    </select>

                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label for="category">Category</label>
                                                    <select id="category"
                                                        placeholder="Select the category"
                                                        name="category"
                                                        onChange={e => onChange(e)}
                                                        value={category}
                                                        className="form-control"
                                                        required>
                                                        <option value="FOOD">Food</option>
                                                        <option value="TECH">Tech</option>
                                                        <option value="BUSI">Busi</option>
                                                    </select>

                                                </div>
                                                <div className="form-group">
                                                    <label for="exampleFormControlSelect1">Title</label>
                                                    <textarea type="text"
                                                        className="form-control"
                                                        id="title"
                                                        name="title"
                                                        value={title}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label for="postImg">Image Upload</label>
                                                    <input type="file"
                                                        accept=".jpg,.png,.jpeg"
                                                        id="postImg" name="postImg"
                                                        onChange={(e) => handleFile(e)}
                                                        accept="image/png,multipart/form-data,image/jpeg"
                                                    >
                                                    </input>

                                                    <hr />
                                                    <b>Previous Image</b>
                                                    {/* <img src={`../../../images/upload-121205098.png`}/> */}
                                                    <ModalImage
                                                        small={(`../../../images/` + post.PostImg)}
                                                        large={(`../../../images/` + post.PostImg)}
                                                        alt="Hello World!"
                                                        className="img-thumbnail"
                                                    />
                                                </div>
                                                <ReactQuill theme="snow" modules={modules}
                                                    formats={formats} onChange={rteChange}
                                                    value={description} style={{ margin: '10px' }} />

                                                <button className='btn btn-success mt-3' value="Update" onClick={e => handleSubmit(e)} type="submit">Update</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>


        );
}

PostEditForm.propTypes = {
    post: PropTypes.object.isRequired,
    getPostById: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
})

export default connect(mapStateToProps,
    { getPostById, clearPost })
    (PostEditForm)