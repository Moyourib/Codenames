import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import stack from '../public/stack.png'
import {db, getCards} from '../fire'

class Board extends Component {

  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    const { gameId } = this.props.match.params
    this.setState({cards: getCards(gameId)})
  }

  render() {
    const { cards } = this.state

    return(
      <div>
        <div className="board">
        {
          cards ? cards.map(word => (<Card handleClick={handleClick} key={word.id} word={word} gameId={this.props.match.params.gameId} />)) :
          <div className="main-container">Loading game...</div>
        }
        </div>
      </div>
    )
  }
}

function handleClick(e){
  const wordId = e.target.id
  const { gameId } = ownProps.match.params
  db.doc(`games/${gameId}/cards/${wordId}`).set({flipped: true}, {merge: true})
  .then(res => {
    console.log(res)
    // dispatch({type:"FLIP_CARD", newCard: res.data()})
  })
  .catch(err => console.log(err))
}

export default Board
