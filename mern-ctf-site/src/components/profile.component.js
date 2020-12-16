import React, { Component } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import authService from '../services/auth.service';

const user = authService.getCurrentUser()

// object for a single blog entry
const BlogEntry = props => (
    <div>
        <a href={'/viewblog/' + props.blog._id}>{props.blog.title}</a>
        <br></br>
    </div>
)

// object for each writeup
const Writeup = props => (
    <div>
        <a href={'/view/' + props.post._id}>{props.post.title}</a>
        <br></br>
    </div>
)

// file for showing a user's profile
export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.blogList = this.blogList.bind(this)
        this.writeupList = this.writeupList.bind(this)

        this.state = {
            posts: [],
            blogs: [],
            username: '',
            bio: '',
            linkedin: '',
            github: '',
            userposts: [],
            writeups: [],
            authorID: this.props.match.params.id,
            disabled: false
        }

    }

    componentDidMount() {
        //check if user is logged in to see if they can edit the profile
        if (!user || this.state.authorID !== user.id) {
            this.setState({
                disabled: true
            })
        }

        // get all posts
        axios.get('http://localhost:5000/posts/')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        // get all blogs
        axios.get('http://localhost:5000/blog/')
            .then(res => {
                this.setState({
                    blogs: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

            // get the data for the profile, not necessarily current user
        axios.get('http://localhost:5000/users/' + this.state.authorID)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    bio: res.data.bio,
                    linkedin: res.data.linkedin,
                    github: res.data.github
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // returns a list of blog entries
    blogList() {
        return this.state.blogs.map(curblog => {
            if (curblog.username === this.state.username) {
                return <BlogEntry blog={curblog} key={curblog._id} />;
            }
            return ''
        })
    }

    // return the list of writeups
    writeupList() {
        return this.state.posts.map(curpost => {
            if (curpost.username === this.state.username) {
                return <Writeup post={curpost} key={curpost._id} />;
            }
            return ''
        })
    }

    // display bio in md
    render() {
        return (
            <div>
                <div className="float-right">
                    <button
                        onClick={() => window.location = '/editprofile/' + this.state.authorId}
                        type='button'
                        disabled={(this.state.disabled) ? "disabled" : ""}
                        className="btn btn-primary">
                        Edit Profile
                    </button>
                </div>
                <h3 className='text-primary'>{this.state.username}'s Profile</h3>
                <br></br>
                <div className='container'>
                    <div className='row'>
                        <div className='mx-auto col'>
                            <h5>Bio:</h5>
                            <ReactMarkdown plugins={[gfm]}>
                                {this.state.bio}
                            </ReactMarkdown>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col m-1 p-3 rounded border border-primary bg-dark text-light'>
                            <h5><u>Posts</u></h5>
                            <div>Writeups: {this.writeupList()}</div>
                            <div>Blogs: {this.blogList()}</div>
                        </div>
                        <div className='col-3 m-1 p-3 rounded border border-primary bg-dark text-light'>
                            <h5><u>Socials</u></h5>

                            {this.state.linkedin !== '' ? (
                                <a href={this.state.linkedin}>LinkedIn</a>
                            ) : (
                                    <p>No LinkedIn yet!</p>
                                )}

                            <br></br>

                            {this.state.github !== '' ? (
                                <a href={this.state.github}>Github</a>
                            ) : (
                                    <p>No Github yet!</p>
                                )}

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}