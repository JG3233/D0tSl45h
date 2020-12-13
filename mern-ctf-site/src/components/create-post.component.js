import React, { Component, createRef } from 'react'
import axios from 'axios'

export default class Posts extends Component {
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
                    username: res.data[0].username
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

        const post = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
        }

        console.log(post)

        axios.post('http://localhost:5000/posts/add', post)
        .then(res => console.log(res.data))
        .catch(err => console.log("Publish post error -> ", err))
        
        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Create New Post</h3>
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
                        <input type="submit" value="Publish Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}