import React, { Component, Fragment } from 'react'
import Header from '../layout/Header'
import Navbar from '../layout/Navbar'
import SideNav from '../layout/SideNav';
import { addPost } from '../../actions/postAction'
import Axios from 'axios';


class PostAddForm2 extends Component {
    state = {
        file: null,
        category: '',
        title: '',
        description: '',

    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({ file: file })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleUpload(e) {
        e.preventDefault()
        // console.log(this.state, 'THE STATE --------')

        let file = this.state.file
        let formdata = new FormData()
        formdata.append('postImg', file)
        formdata.append('category', this.state.category)
        formdata.append('title', this.state.title)
        formdata.append('description', this.state.description)

        console.log('FORM DATA IS ::: '+JSON.stringify(formdata))
        // addPost({formdata:formdata})
        Axios({
            url:'http://localhost:8080/v1/posts',
            method:'post',
            data:formdata
        })
        console.log('AFTER ADD POST')
    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <Header />
                <section id="main">
                    <div className="container">
                        <div className="row">
                            <SideNav />
                            <div className="col-md-9">
                                <div className="panel panel-default">
                                    <div className="panel-heading main-color-bg">
                                        <h3 className="panel-title">Add New Post</h3>
                                    </div>
                                    <div className="panel-body">

                                        <br />
                                        <form onSubmit={e => this.handleUpload(e)}>
                                            <div className="form-group">
                                                <label for="formId">Form Id</label>
                                                <select id="formId"
                                                    placeholder="Select the form"
                                                    name="formId"
                                                    onChange={e => this.onChange(e)}
                                                >
                                                    <option value="id1">Simple Form</option>
                                                    <option value="id2">Simple Form 2</option>
                                                </select>

                                            </div>

                                            <div className="form-group">
                                                <label for="category">Category</label>
                                                <select id="category"
                                                    placeholder="Select the category"
                                                    name="category"
                                                    onChange={e => this.onChange(e)}
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
                                                    placeholder="title"
                                                    name="title"
                                                    onChange={e => this.onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="description">Description</label>
                                                <textarea className="form-control"
                                                    id="description"
                                                    rows="3"
                                                    name="description"
                                                    onChange={e => this.onChange(e)}
                                                    required
                                                ></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label for="postImg">Image Upload</label>
                                                <input type="file"
                                                    accept=".jpg,.png,.jpeg"
                                                    id="postImg" name="postImg"
                                                    onChange={(e) => this.handleFile(e)}
                                                    accept="image/png,multipart/form-data,image/jpeg"
                                                >
                                                </input>
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default PostAddForm2