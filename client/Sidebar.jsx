import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'


const Sidebar = props => {
  const { game, user, setGame } = props

  return (
    <div className="sidebar">
      <div>
        CLUE:
      </div>
      <div>
        PLAYERS:
        {
          game.players && game.players.map(player => <h4>{player.email}</h4>)
        }
      </div>
    </div>
  )
}

const addPlayer = (game, user) => {
  //psuedocode
  game.players[user.uid] = user.displayname
}

export default Sidebar
