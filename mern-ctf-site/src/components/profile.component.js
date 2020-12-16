import React, { Component } from 'react'
import axios from 'axios'
import authService from '../services/auth.service';

const user = authService.getCurrentUser()

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            blogs: [],
            username: '',
            bio: '',
            linkedin: '',
            github: '',
            userposts: [],
            writeups: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts/')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:5000/blog/')
            .then(res => {
                this.setState({
                    blogs: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:5000/users/' + user.id)
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

    render() {
        return (
            <div>
                <div className="float-right">
                    <button
                        onClick={() => window.location = '/editprofile/' + user.id}
                        type='button'
                        className="btn btn-primary"
                    >
                        Edit Profile
                    </button>
                </div>
                <h3 className='text-primary'>{this.state.username}'s Profile</h3>
                <br></br>
                <div className='container'>
                    <div className='row'>
                        <div className='mx-auto col'>
                            <h5>Bio:</h5>
                            <p>
                                {this.state.bio}
                            </p>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col m-1 p-3 rounded border border-primary bg-dark text-light'>
                            <h5><u>Posts</u></h5>
                            <p>Writeups: {this.state.writeups}</p>
                            <p>Blogs: {this.state.userposts}</p>
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