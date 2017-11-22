import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const Start = (props) => {
  return(
    <div className="main-container">
      <form onSubmit={}>
        <input type="text" name="name" value="name"/>
        <input type="email" name="email" value="email"/>
        <input type="password" name="password" value="password"/>
        <input type="submit"/>
      </form>
      <div onClick={}>Log in with Google!!!</div>
    </div>
  )
}



const mapState = state => ({})

const mapDispatch = (dispatch, ownProps) => ({

})


export default withRouter(connect(mapState, mapDispatch)(Start))
