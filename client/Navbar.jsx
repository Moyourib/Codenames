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
      <Link to="/"><h1>CODENAMES</h1></Link>
      {
        props.user ?
        <div onClick={props.signOut}>log out</div>
        :
        <div></div>
      }
    </nav>
  )
}

export default withAuth(Navbar)
