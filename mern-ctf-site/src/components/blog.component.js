import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// blog object for each blog in list
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

// file for showing blog posts
export default class Blogposts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)

        this.state = { blogposts: [] }
    }

    //get all the blogs
    componentDidMount() {
        axios.get('http://localhost:5000/blog')
            .then(res => {
                this.setState({
                    blogposts: res.data
                })
            })
            .catch(err => console.log('Get blog posts error -> ', err))
    }

    // delete a blog, send auth header
    deletePost(id) {
        axios.delete('http://localhost:5000/blog/' + id, { headers: authService.authHeader() })
            .then(res => { console.log(res) })
            .catch(err => { console.log('Deletion error -> ', err) })

        this.setState({
            blogposts: this.state.blogposts.filter(elem => elem._id !== id)
        })
    }

    // goes through each blog, created blog object from each
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