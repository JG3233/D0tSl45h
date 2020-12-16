import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// object to help display each writeup in the table
const Post = props => (
    <tr>
        <td>
            <Link to={'/profile/' + props.post.authorID}>{props.post.username}</Link>
        </td>
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

// use an api and this function to format webmaster github data
const GithubProfile = props => (
    <div className='p-2 w-50 col m-1 float-right text-center rounded border border-success bg-dark text-light'>
        <h6 className='fs-5'>Webmaster Github</h6>
        <img alt='profile pic' className='rounded-circle border-light' height='50' width='50' src={props.data.avatar_url}></img>
        <a className='fs-6' href={props.data.html_url}>@{props.data.login}</a>
        <p className='fs-6'>{props.data.bio}</p>
    </div>
)

// use an api and this function to format webmaster github data
const News = props => (
    <div>
        <a className='text-success' href={props.news.url}>{props.news.title}</a>
        <br></br>
    </div>
)

// file to show all writeups on home page
export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)
        this.onChangeKeyword = this.onChangeKeyword.bind(this)

        this.state = {
            users: [],
            posts: [],
            githubdata: [],
            news: [],
            searchterm: localStorage.getItem('keyword')
        }
    }

    // get all the writeups
    componentDidMount() {
        axios.get('http://localhost:5000/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log('Get posts error -> ', err))

        // get all the users
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => console.log('Get users error -> ', err))

        // get data for github api
        axios.get('https://api.github.com/users/JG3233')
            .then(res => {
                this.setState({
                    githubdata: res.data
                })
            })
            .catch(err => console.log('Get Github data error -> ', err))

        this.getNews()
    }

    getNews() {
        // get data for news api
        this.setState({
            searchterm: localStorage.getItem('keyword')
        })

        let d = new Date()
        let today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 1)
        // axios.get('https://newsapi.org/v2/everything?q=' + this.state.searchterm + '&from=' + today + '&to=' + today + '&sortBy=popularity&apiKey=db5284f864a6438b9b085181d05f0e7d')
        //     .then(res => {
        //         for (let i = 0; i < 5; ++i) {
        //             this.state.news.push(res.data.articles[i])
        //         }
        //     })
        //     .catch(err => console.log('Get news data error -> ', err))
    }

    onChangeKeyword(e) {
        localStorage.setItem('keyword', e.target.value)
        this.setState({
            searchterm: e.target.value
        })
    }


    // allow a user to delete a post if it is theirs
    deletePost(id) {
        axios.delete('http://localhost:5000/posts/' + id, { headers: authService.authHeader() })
            .then(res => { console.log(res) })
            .catch(err => { console.log('Deletion error -> ', err) })

        this.setState({
            posts: this.state.posts.filter(elem => elem._id !== id)
        })
    }

    // return a list of writeups with map
    postList() {
        return this.state.posts.map(curpost => {
            return <Post post={curpost} deletePost={this.deletePost} key={curpost._id} />;
        })
    }

    // easy call to github api function
    Githubdata() {
        return <GithubProfile data={this.state.githubdata} />;
    }

    // call to list out news
    newsList() {
        return this.state.news.map(curnews => {
            return <News news={curnews} key={curnews.url} />;
        })
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
                <div className='row'>
                    <div className='p-2 w-50 m-1 col float-left text-center rounded border border-success bg-dark text-light'>
                        <h6 className='fs-5'>Today's top {this.state.searchterm === '' ? "'keyword'" : this.state.searchterm} articles</h6>
                        {this.newsList()}
                    </div>
                    {this.Githubdata()}
                </div>
                <br></br>
                <form onSubmit={this.getNews}>
                    <div className="form-group">
                        <label className='mx-auto'>Want to see different articles? Choose a new keyword!</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.searchterm}
                            onChange={this.onChangeKeyword}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Search"
                            className="btn btn-success"
                        />
                    </div>
                </form>
            </div >
        )
    }
}