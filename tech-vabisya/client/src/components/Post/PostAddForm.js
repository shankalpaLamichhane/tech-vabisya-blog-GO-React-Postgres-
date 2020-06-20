import React, { Component, Fragment } from 'react'
import Header from '../layout/Header'
import Navbar from '../layout/Navbar'
import SideNav from '../layout/SideNav';
import Axios from 'axios'; import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Notifications from '../Common/Notification'
import LeftMenu from '../Admin/LeftMenu/LeftMenu'
import TopMenu from '../Admin/TopMenu/TopMenu'

class PostAddForm extends Component {

    state = {
        file: null,
        category: '',
        title: '',
        description: '',
        formId: '',
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({ file: file })
    }

    onChange(e) {
        console.log('THE E IS ' + (e))
        if (typeof e === "object") {
            console.log(true)
            this.setState(
                { [e.target.name]: e.target.value })
        }
    }

    handleUpload(e) {
        e.preventDefault();
        let file = this.state.file
        let formData = new FormData()
        formData.append('postImg', file)
        formData.append('category', this.state.category)
        formData.append('description', this.state.description)
        formData.append('title', this.state.title)
        formData.append('formId', this.state.formId)

        console.log('FORM DATA IS ::: ' + JSON.stringify(formData))
        Axios({
            url: 'http://localhost:8080/v1/posts',
            method: 'post',
            data: formData
        })
        console.log('AFTER ADD POST')

    }

    constructor(props) {
        super(props);

        this.modules = {
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

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];


        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (content, delta, source, editor) => {
        console.log('RICH TEXT')
        console.log(editor.getHTML()); // rich text
        console.log('PLAIN TEXT')
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters
        this.setState({ description: editor.getHTML() })
    }

    render() {
        return (
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
                                        <div className="panel panel-default">
                                            <h3 >Add new post</h3>


                                            <br />
                                            <form onSubmit={e => this.handleUpload(e)}>

                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="formId">Form Id</label>
                                                        <select id="formId"
                                                            placeholder="Select the form"
                                                            className="form-control"
                                                            name="formId"
                                                            value={this.state.formId}
                                                            onChange={e => this.onChange(e)}
                                                        >
                                                            <option value="id1">Simple Form</option>
                                                            <option value="id2">Simple Form 2</option>
                                                        </select>
                                                    </div>


                                                    <div className="form-group col-md-6">
                                                        <label for="category">Category</label>
                                                        <select id="category"
                                                            placeholder="Select the category"
                                                            className="form-control"
                                                            name="category"
                                                            defaultValue="TECH"
                                                            onChange={e => this.onChange(e)}
                                                            value={this.state.category}
                                                            required>
                                                            <option value="FOOD">Food</option>
                                                            <option value="TECH">Tech</option>
                                                            <option value="BUSI">Busi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row" style={{ padding: '5px' }}>
                                                    <div className="form-group col-md-12">
                                                        <label for="exampleFormControlSelect1">Title</label>
                                                        <textarea type="text"
                                                            className="form-control"
                                                            id="title"
                                                            placeholder="title"
                                                            name="title"
                                                            value={this.state.title}
                                                            onChange={e => this.onChange(e)}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label for="postImg">Upload Image</label>
                                                    <br />
                                                    <input type="file"
                                                        accept=".jpg,.png,.jpeg"
                                                        id="postImg" name="postImg"
                                                        onChange={(e) => this.handleFile(e)}
                                                        accept="image/png,multipart/form-data,image/jpeg"
                                                    >
                                                    </input>
                                                </div>
                                                <h5>Enter Description </h5>
                                                <ReactQuill theme="snow" modules={this.modules}
                                                    formats={this.formats} onChange={this.rteChange}
                                                    defaultValue={this.state.description}
                                                    value={this.state.description} style={{ margin: '10px' }} />
                                                <button type="submit" className="btn btn-success" style={{ margin: '10px' }}>Submit</button>
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

}

export default PostAddForm;