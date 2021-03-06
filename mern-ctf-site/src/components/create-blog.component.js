import React, { Component, createRef } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// create a blog post
export default class BlogPosts extends Component {
    constructor(props) {
        super(props)

        // listen for changes to each field
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            title: '',
            content: '',
            users: [],
            disabled: user
        }

        this.formInput = createRef()
    }

    // set username if logged in
    componentDidMount() {
        if (user) {
            this.setState({
                username: user.username
            })
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    // attempt to add to db, auth header
    onSubmit(e) {
        e.preventDefault()

        const blogpost = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
        }

        axios.post('http://localhost:5000/blog/add', blogpost, { headers: authService.authHeader() })
            .then(res => console.log(res.data))
            .catch(err => console.log("Publish post error -> ", err))

        window.location = '/blog'
    }

    render() {
        return (
            <div>
                <h3>Create New Blog Post</h3><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h5 className="text-success">Author: {user ? user.username : 'Log in to post!'}</h5>
                    </div>
                    <div className="form-group">
                        <label>Topic: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            disabled={(!this.state.disabled) ? "disabled" : ""}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                            type="text"
                            rows='10'
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                            disabled={(!this.state.disabled) ? "disabled" : ""}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <p>^I can render markdown!^</p>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Publish"
                            className="btn btn-success"
                            disabled={(!this.state.disabled) ? "disabled" : ""}
                        />
                    </div>
                </form>
            </div>
        )
    }
}