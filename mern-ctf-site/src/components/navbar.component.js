import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Navbar extends Component {

    render() {
        return (
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to="/" className='navbar-brand'>SloppySec</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to='/' className='nav-link'>Posts</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/create' className='nav-link'>Create a Post</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/signin' className='nav-link'>Signin</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}