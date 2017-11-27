import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { makeGame } from './gamelogic'

const UserHome = props => {
  const onClick = () => makeGame(props.history)
  return(
    <div>
      <div className="main-container">
        <h2>Welcome, {props.user.email}</h2>
      </div>
      <div className="main-container">
        <div className="button start" onClick={onClick}><h2>START GAME</h2></div>
        <Link to="/join" className="button start"><div><h2>JOIN GAME</h2></div></Link>
      </div>
      <div className="main-container"><h2>Your games here:</h2></div>
    </div>
  )
}

export default UserHome
