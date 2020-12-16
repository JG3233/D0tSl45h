import React, { Component, createRef } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

const user = authService.getCurrentUser()

// file to allow users to edit profile data
export default class EditProfile extends Component {
    constructor(props) {
        super(props)

        // listen for field changes
        this.onChangeBio = this.onChangeBio.bind(this)
        this.onChangeLinkedIn = this.onChangeLinkedIn.bind(this)
        this.onChangeGithub = this.onChangeGithub.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            bio: '',
            linkedin: '',
            github: ''
        }

        this.formInput = createRef()
    }

    // get this users data
    componentDidMount() {
        axios.get('http://localhost:5000/users/' + user.id)
            .then(res => {
                this.setState({
                    bio: res.data.bio,
                    linkedin: res.data.linkedin,
                    github: res.data.github
                })
            })
    }

    onChangeBio(e) {
        this.setState({
            bio: e.target.value
        })
    }

    onChangeLinkedIn(e) {
        this.setState({
            linkedin: e.target.value
        })
    }

    onChangeGithub(e) {
        this.setState({
            github: e.target.value
        })
    }

    // try to update profile, another auth check
    onSubmit(e) {
        e.preventDefault()

        const profile = {
            bio: this.state.bio,
            linkedin: this.state.linkedin,
            github: this.state.github
        }

        axios.post('http://localhost:5000/users/update/' + user.id, profile, { headers: authService.authHeader() })
            .then(res => console.log(res.data))
            .catch(err => console.log("Update Profile error -> ", err))

        window.location = '/profile/' + user.id
    }

    render() {
        return (
            <div>
                <h3>Update Profile for {user.username}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Bio:</label>
                        <textarea
                            type="text"
                            rows='10'
                            className="form-control"
                            value={this.state.bio}
                            onChange={this.onChangeBio}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>LinkedIn link: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.linkedin}
                            onChange={this.onChangeLinkedIn}
                        />
                    </div>
                    <div className="form-group">
                        <label>Github Link: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.github}
                            onChange={this.onChangeGithub}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Profile" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}