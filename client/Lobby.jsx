import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {db} from '../fire'

class Lobby extends Component{

  state={
    games:[]
  }

  componentDidMount(){
    db.collection('games').where('status', '==', "pending").get()
    .then(res => res.docs.map(doc => ({id:doc.id, ...doc.data()})))
    .then(arr => this.setState({games:arr.length?arr:[{id: "No open games!"}]}))
  }

  render(){
    const {games} = this.state
    return(
      <div className="main-container">
        <h2 className="nav-title">Click a game to join!</h2>
        <div className="lobby">
          {
            games.length ? games.map(game => (
              <Link to={"/"+game.id} key={game.id} className="button">
                <div>{game.id}</div>
              </Link>
            ))
            : <div>Searching for games...</div>
          }
        </div>
      </div>
    )
  }
}

export default Lobby
