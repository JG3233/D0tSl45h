import React, { Component } from 'react'
import authService from '../services/auth.service'

// file for registration page
export default class Register extends Component {
    constructor(props) {
        super(props)

        // listen for field updates
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount(){
        localStorage.setItem( 'keyword', 'cybersecurity' );
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

    // user authservice to attempt to register
    onSubmit(e) {
        e.preventDefault()

        authService.register(this.state.username, this.state.password)
    }

    render() {
        return (
            <div>
                <h3>Register Here</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" onChange={this.onChangeUsername} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.onChangePassword} />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}