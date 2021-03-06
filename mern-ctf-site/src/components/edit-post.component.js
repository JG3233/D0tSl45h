import React, { Component, createRef } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// file to let users edit a writeup
export default class EditPosts extends Component {
    constructor(props) {
        super(props)

        // listen for field changes
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            title: '',
            content: '',
            users: []
        }

        this.formInput = createRef()
    }

    componentDidMount() {
        if (user){
            this.setState({
                username: user.username
            })
        }

        // get info for post, populate
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
        .then(res => {
                this.setState({
                    username: res.data.username,
                    title: res.data.title,
                    content: res.data.content
                })
        })
        .catch(err => {
            console.log(err)
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

    //update the writeup, auth check
    onSubmit(e) {
        e.preventDefault()

        const post = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
        }

        console.log(post)

        axios.post('http://localhost:5000/posts/update/'+ this.props.match.params.id, post, { headers: authService.authHeader() })
        .then(res => console.log(res.data))
        .catch(err => console.log("Publish post error -> ", err))
        
        window.location = '/view/' + this.props.match.params.id
    }

    render() {
        return (
            <div>
                <h3>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <h5 className="text-success">Author: {user ? user.username : 'Log in to post!'}</h5>
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                            type="text"
                            rows='20'
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Post" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}