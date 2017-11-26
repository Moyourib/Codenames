import React, { Component } from 'react'
import { connect } from 'react-redux';
import stack from '../public/stack.png'
import {db, getGame, getCards} from '../fire'
import withAuth from './withAuth'

class Board extends Component {

  componentDidMount() {
    const { gameId } = this.props.match.params
    this.props.loadBoard(gameId)
    console.log(this.props.user.uid)
  }

  componentWillUnmount() {

  }

  render() {
    const { cards, changeTurn, turn, handleClick } = this.props
    return(
      <div>
        <div className="board">
        {
          cards.length ? cards.map(word => (
            <div key={word.id} id={word.id} onClick={handleClick} className={`card ${word.color}`}>
              <h2 id={word.id}>{word.word}</h2>
            </div>
          ))
          :
          <div className="main-container">Loading game...</div>
        }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cards: state.cards,
})

const mapDispatch = (dispatch, ownProps) => ({
  loadBoard(gameId) {
    db.collection(`games/${gameId}/cards/`).get()
    .then(querySnapshot => {
      const cards = []
      querySnapshot.forEach(doc => {
        const card = doc.data()
        const color = card.flipped && card.color
        const id = doc.id
        cards.push({id, color, word:card.word})
      })
      dispatch({type:"SET_CARDS", cards})
    })
      // dispatch({type:"SET_CARDS", cards:[{word:"No game found... :*(", flipped: true}]})
    .catch(err => console.error(err))
  },
  handleClick(e) {
    const { gameId } = ownProps.match.params
    const cardId = e.target.id
    db.doc(`games/${gameId}/cards/${cardId}`).update("flipped", true)
    db.doc(`games/${gameId}/cards/${cardId}`).get()
    .then(res => {
      const card = {id: res.id, ...res.data()}
      dispatch({type: "FLIP_CARD", card})
    })
  },
  changeTurn(e) {
    dispatch({type:"CHANGE_TURN"})
  }
})

export default connect(mapState, mapDispatch)(withAuth(Board))
