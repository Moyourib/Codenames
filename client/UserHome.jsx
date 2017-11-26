import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { makeGame } from './gamelogic'

const UserHome = props => {
  const onClick = () => makeGame(props.history)
  return(
    <div className="main-container">
      <h2>Welcome, {props.user.email}</h2>
      <div className="button start" onClick={onClick}><h2>START GAME</h2></div>
      <div className="button start"><h2>JOIN GAME</h2></div>
    </div>
  )
}

export default UserHome
