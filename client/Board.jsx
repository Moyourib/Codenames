import React, { Component } from 'react'
import { connect } from 'react-redux';
import stack from '../public/stack.png'
import {db} from '../fire'
import withAuth from './withAuth'

class Board extends Component {

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { gameId } = this.props.match.params
    const userId = this.props.user.id
    const { loadPlayerBoard, setCard } = this.props
    //if game.spyMasters.includes(userId) loadSpymasterBoard(gameId)
    this.props.loadPlayerBoard(gameId)
    const cardsRef = db.collection(`games/${gameId}/cards`)
    cardsRef.onSnapshot(snap => {
      snap.docChanges.forEach(change => {
        const card = change.doc.data()
        const color = card.flipped && card.color
        const id = change.doc.id
        setCard({id, color, word:card.word})
      })
    })
  }

  handleClick(e) {
    const { gameId } = this.props.match.params
    const cardId = e.target.id
    db.doc(`games/${gameId}/cards/${cardId}`).update("flipped", true)
  }

  render() {
    const { cards, changeTurn, turn, players } = this.props
    return(
      <div>
        <div className="board">
        {
          cards.length ? cards.map(word => (
            <div key={word.id} id={word.id} onClick={this.handleClick} className={`card ${word.color}`}>
              <h2 id={word.id}>{word.word}</h2>
            </div>
          ))
          :
          <div className="main-container">Loading game...</div>
        }
        </div>
        <div className="game-sidebar">
          <div>
          Players:
          {players.map(x => <div>PLAYER NAME</div>)}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cards: state.cards,
  players: state.players,
})

const mapDispatch = (dispatch, ownProps) => ({
  loadPlayerBoard(gameId) {
    const gameRef = db.doc(`games/${gameId}`)
    gameRef.get()
    .then(snap => snap.data())
    .then(game => {
      const { players } = game
      console.log(game)
      dispatch({type:"SET_PLAYERS", players})
    })
    gameRef.collection('cards').get()
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
  setCard (card) {
    dispatch({type: "SET_CARD", card})
  },
  changeTurn(e) {
    dispatch({type:"CHANGE_TURN"})
  }
})

export default connect(mapState, mapDispatch)(withAuth(Board))
