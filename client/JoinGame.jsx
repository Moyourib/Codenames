import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {db} from '../fire'

class JoinGame extends Component{

  state={
    games:[]
  }

  componentDidMount(){
    db.collection('games').where('status', '==', "pending").get()
    .then(res => res.docs.map(doc => ({id:doc.id, ...doc.data()})))
    .then(arr => this.setState({games:arr}))
  }

  render(){
    return(
      <div>
        <h2>Click a game to join!</h2>
        <div className="main-container">
          {
            this.state.games.map(game => (
              <Link to={"/"+game.id} key={game.id} className="card">
                <div>{game.id}</div>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
}

export default JoinGame
