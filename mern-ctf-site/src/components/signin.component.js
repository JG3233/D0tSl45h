import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
//import axios from 'axios'

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { posts: [] }
    }

    componentDidMount() {

    }

    render() {
        return (
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}