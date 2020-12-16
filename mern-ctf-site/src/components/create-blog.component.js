import React, { Component, createRef } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

export default class BlogPosts extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
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

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: user.username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
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

    onSubmit(e) {
        e.preventDefault()

        const blogpost = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
        }

        console.log(blogpost)

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
                        <h5 className="text-primary">Author: {user ? user.username : 'Log in to post!'}</h5>
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
                            className="btn btn-primary"
                            disabled={(!this.state.disabled) ? "disabled" : ""}
                        />
                    </div>
                </form>
            </div>
        )
    }
}