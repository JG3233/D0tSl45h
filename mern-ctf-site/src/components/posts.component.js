import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()
const Post = props => (
    <tr>
        <td>{props.post.username}</td>
        <td>{props.post.title.substring(0, 30)}</td>
        <td>{props.post.content.substring(0, 30)}</td>
        {user && user.username === props.post.username ?
            (
                <td>
                    <Link to={"/view/" + props.post._id}>View</Link> |
                    <Link to={"/edit/" + props.post._id}> Edit</Link> |
                    <a href="/" onClick={() => { props.deletePost(props.post._id) }}> Delete</a>
                </td>
            ) : (
                <td>
                    <Link to={"/view/" + props.post._id}>View</Link>
                </td>
            )
        }
    </tr>
)

const GithubProfile = props => (
    <div className='p-2 w-50 float-right text-center rounded border border-primary bg-dark text-light'>
        <h6 className='fs-5'>Webmaster Github</h6>
        <img alt='profile pic' className='rounded-circle border-light' height='50' width='50' src={props.data.avatar_url}></img>
        <a className='fs-6' href={props.data.html_url}>@{props.data.login}</a>
        <p className='fs-6'>{props.data.bio}</p>
    </div>
)

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)

        this.state = {
            posts: [],
            githubdata: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log('Get posts error -> ', err))

        axios.get('https://api.github.com/users/JG3233')
        .then(res => {
            this.setState({
                githubdata: res.data
            })
        })
        .catch(err => console.log('Get Github data error -> ', err))
    }

    deletePost(id) {
        axios.delete('http://localhost:5000/posts/' + id, { headers: authService.authHeader() })
            .then(res => { console.log(res) })
            .catch(err => { console.log('Deletion error -> ', err) })

        this.setState({
            posts: this.state.posts.filter(elem => elem._id !== id)
        })
    }

    postList() {
        return this.state.posts.map(curpost => {
            return <Post post={curpost} deletePost={this.deletePost} key={curpost._id} />;
        })
    }

    Githubdata() {
            return <GithubProfile data={this.state.githubdata}/>;
    }

    render() {
        return (
            <div>
                <h3>Writeups</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User</th>
                            <th>Challenge</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
                <div>
                    {this.Githubdata()}
                </div>
            </div >
        )
    }
}