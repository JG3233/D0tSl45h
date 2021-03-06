import React, { Component, createRef } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// file for creating writeups
export default class Posts extends Component {
    constructor(props) {
        super(props)

        //listen for field changes
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

    // get all the user
    componentDidMount() {
        if(user){
            this.setState({
                username: user.username
            })
        }
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

    // try to add new writeup, auth header
    onSubmit(e) {
        e.preventDefault()

        const post = {
            username: this.state.username,
            authorID: user.id,
            title: this.state.title,
            content: this.state.content
        }

        console.log(post)

        axios.post('http://localhost:5000/posts/add', post, { headers: authService.authHeader() })
            .then(res => console.log(res.data))
            .catch(err => console.log("Publish post error -> ", err))

        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Create New Post</h3><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h5 className="text-success">Author: {user ? user.username : 'Log in to post!'}</h5>
                    </div>
                    <div className="form-group">
                        <label>Title/Challenge: </label>
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
                            rows='20'
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                            disabled={(!this.state.disabled) ? "disabled" : ""}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <p>^I render markdown! Include the challenge link and code snippets! <br></br>
                            Link: [link text that will show](challenge url) <br></br>
                            Code uses backticks: `x = x + 1`
                        </p>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Publish Writeup"
                            className="btn btn-success"
                            disabled={(!this.state.disabled) ? "disabled" : ""}
                        />
                    </div>
                </form>
            </div>
        )
    }
}