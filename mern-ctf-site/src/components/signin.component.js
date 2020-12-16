import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.service'

// file to let users sign in
export default class Signin extends Component {
    constructor(props) {
        super(props)

        // listen to field changes
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: "",
            password: ""
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    // use authservice to login
    onSubmit(e) {
        e.preventDefault()

        authService.login(this.state.username, this.state.password)
    }

    render() {
        return (
            <div>
                <h3>Sign in Below or Register to get started!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" onChange={this.onChangeUsername} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.onChangePassword} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br></br>
                <Link to='/register'>Still need to Register?</Link>
            </div>
        )
    }
}