import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withAuth from './withAuth'
import UserHome from './UserHome'

const Start = (props) => {
  return props.user ?
  (
    <UserHome user={props.user} history={props.history}/>
  )
  :
  (
    <div className="main-container">
      <div className="login-panel">
        <div>
          <h6>Sign In</h6>
          <form onSubmit={props.signIn}>
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <input type="submit"/>
          </form>
        </div>

        <div>
          <h6>Sign Up</h6>
          <form onSubmit={props.createUser}>
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <input type="submit"/>
          </form>
        </div>

        <div className="button" onClick={props.signInWithGoogle}>Log in with Google!!!</div>
      </div>
    </div>
  )
}

export default withAuth((Start))
