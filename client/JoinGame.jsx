import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const JoinGame = props => {
  return(
    <div>
      <h2>Click a game to join!</h2>
      <div className="main-container">
        {
          sampleGames.map(game => (
            <Link to={"/"+game.id}>
              <div className="card">{game.id}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

const sampleGames = [
  {id:'mWIHH1NAbS8RrXW0wiKN'},
  {id:'AcDTBipAUMKfa1tRvSLy'},
  {id:'FwSh619ulUeTygbuz77b'},
  {id:'JirycUy5OmGdBBLqZTER'},
]

export default JoinGame
