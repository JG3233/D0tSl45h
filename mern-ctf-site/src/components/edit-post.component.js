import React, { Component, createRef } from 'react'
import axios from 'axios'
import { connection } from 'mongoose'

export default class EditPosts extends Component {
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
            users: []
        }

        this.formInput = createRef()
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                })
            }
        })
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

    onSubmit(e) {
        e.preventDefault()

        const post = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
        }

        console.log(post)

        axios.post('http://localhost:5000/posts/update/'+ this.props.match.params.id, post)
        .then(res => console.log(res.data))
        .catch(err => console.log("Publish post error -> ", err))
        
        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.formInput}
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (users) {
                                    return <option
                                        key={users}
                                        value={users}>{users}
                                    </option>;
                                })
                            }
                        </select>
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
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}