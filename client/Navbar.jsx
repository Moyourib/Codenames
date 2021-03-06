import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {auth, db, provider} from '../fire'
import stack from '../public/stack.png'
import withAuth from './withAuth'

const Navbar = (props) => {
  return (
    <nav>
      <img src={stack} className="hamburger" />
      <Link to="/home"><h1 className="nav-title">CODENAMES</h1></Link>
      <div className="login" onClick={props.user ? props.signOut : props.signIn}>
        {props.user ? <h6>LOG OUT</h6> : <h6>LOG IN</h6>}
      </div>
    </nav>
  )
}

export default withAuth(Navbar)
