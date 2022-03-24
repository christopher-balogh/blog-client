import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './navbar.css';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className='navbar-logo'>Logo</Link>
      <Link to='/login' className='nav-login'> Log In </Link>
    </nav>
  )
}
