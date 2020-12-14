import React, { Component } from 'react'
import { Link } from "react-router-dom"
import authService from '../services/auth.service';

const user = authService.getCurrentUser()

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        authService.logout()
        window.location = '/'
    }

    render() {
        return (
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to="/" className='navbar-brand'>D0tS14sh</Link>
                { user ? (
                    <div className='navbar-collapse'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='navbar-item'>
                                <Link to='/' className='nav-link'>Writeups</Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/create' className='nav-link'>Create a Writeup</Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/' onClick={this.logOut} className='nav-link'>Logout</Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                        <div className='navbar-collapse'>
                            <ul className='navbar-nav mr-auto'>
                                <li className='navbar-item'>
                                    <Link to='/' className='nav-link'>Writeups</Link>
                                </li>
                                <li className='navbar-item'>
                                    <Link to='/create' className='nav-link'>Create a Writeup</Link>
                                </li>
                                <li className='navbar-item'>
                                    <Link to='/signin' className='nav-link'>Sign in</Link>
                                </li>
                                <li className='navbar-item'>
                                    <Link to='/register' className='nav-link'>Register</Link>
                                </li>
                            </ul>
                        </div>
                    )}
            </nav>
        )
    }
}