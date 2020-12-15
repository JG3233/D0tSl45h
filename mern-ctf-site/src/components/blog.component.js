import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

const Blog = props => (
    <div className='p-3 rounded border border-primary bg-dark text-light'>
        <h5>Topic: {props.post.title}</h5>
        <h6>Author: {props.post.username}</h6>
        {user && user.username === props.post.username ?
            (
                <div>
                    <Link to={"/viewblog/" + props.post._id}>View</Link> |
                    <Link to={"/editblog/" + props.post._id}> Edit</Link> |
                    <a href="/blog" onClick={() => { props.deletePost(props.post._id) }}> Delete</a>
                </div>
            ) : (
                <div>
                    <Link to={"/viewblog/" + props.post._id}>View</Link>
                </div>
            )
        }
        <p>{props.post.content.substring(0, 500)}</p>
    </div>
)

export default class Blogposts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)

        this.state = { blogposts: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/blog')
            .then(res => {
                this.setState({
                    blogposts: res.data
                })
            })
            .catch(err => console.log('Get blog posts error -> ', err))
    }

    deletePost(id) {
        axios.delete('http://localhost:5000/blog/' + id, { headers: authService.authHeader() })
            .then(res => { console.log(res) })
            .catch(err => { console.log('Deletion error -> ', err) })

        this.setState({
            blogposts: this.state.blogposts.filter(elem => elem._id !== id)
        })
    }

    blogList() {
        return this.state.blogposts.map(curpost => {
            return <div key={curpost._id}>
                <Blog post={curpost} deletePost={this.deletePost} />
                <br></br>
            </div>
        })
    }

    render() {
        return (
            <div>
                <h3>Blog Posts</h3>
                <Link to='/createblog'>Add a new blog post</Link>
                <br></br><br></br>
                {this.blogList()}
            </div>
        )
    }
}