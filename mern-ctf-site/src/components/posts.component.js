import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Post = props => (
    <tr>
      <td>{props.post.username}</td>
      <td>{props.post.title}</td>
      <td>{props.post.content}</td>
      <td>
        <Link to={"/edit/"+props.post._id}>edit</Link> | <a href="/" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
      </td>
    </tr>
  )

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)

        this.state = { posts: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log('Get posts error -> ', err))
    }

    deletePost(id) {
        axios.delete('http://localhost:5000/posts/' + id)
            .then(res => { console.log(res) })
            .catch(err => { console.log('Deletion error -> ', err) })

        this.setState({
            posts: this.state.posts.filter(elem => elem._id !== id)
        })
    }

    postList() {
        return this.state.posts.map(curpost => {
          return <Post post={curpost} deletePost={this.deletePost} key={curpost._id}/>;
        })
      }

    render() {
        return (
            <div>
                <h3>Posts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>
        )
    }
}