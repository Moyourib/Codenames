import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { makeGame } from './gamelogic'

const UserHome = (props) => {
  return(
    <div className="main-container">
      <div className="button" onClick={props.makeGame}><h2>START GAME</h2></div>
      <div className="button"><h2>JOIN GAME</h2></div>
    </div>
  )
}

const mapState = state => ({})

const mapDispatch = (dispatch, ownProps) => ({
  makeGame
})


export default withRouter(connect(mapState, mapDispatch)(UserHome))
