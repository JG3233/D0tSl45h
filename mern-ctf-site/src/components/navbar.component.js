import React, { Component } from 'react'
import { Link } from "react-router-dom"
import authService from '../services/auth.service';

const user = authService.getCurrentUser()

// navbar for entire site
export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        authService.logout()
        window.location = '/'
    }

    // render method uses jsx to pick a navbar according to whether a user is logged in
    render() {
        return (
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to="/" className=' text-success navbar-brand'>D0tS14sh</Link>
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
                                <Link to='/blog' className='nav-link'>Blog</Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to={'/profile/' + user.id} className='nav-link'>Profile</Link>
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
                                    <Link to='/blog' className='nav-link'>Blog</Link>
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