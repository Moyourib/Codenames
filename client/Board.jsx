import React, { Component } from 'react'
import { connect } from 'react-redux';
import stack from '../public/stack.png'
import {db, createEventListener} from '../fire'
import Sidebar from './Sidebar'
import {dealCards} from './gamelogic'
import withAuth from './withAuth'

class Board extends Component {

  constructor(props){
    super(props)
    this.clickCard = this.clickCard.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    const { gameId } = this.props.match.params
    const { setCard, setGame, game, user } = this.props
    createEventListener(gameId, setCard, setGame)
  }

  componentWillUnmount(){
    this.props.clearCards()
  }

  clickCard (e) {
    const { gameId } = this.props.match.params
    const cardId = e.target.id
    db.doc(`games/${gameId}/cards/${cardId}`).update("flipped", true)
  }

  startGame() {
    const { gameId } = this.props.match.params
    const gameInfo = this.props.game
    gameInfo.status = "In Progress"
    db.doc(`games/${gameId}`).set(gameInfo)
    .then(() => {
      dealCards(this.props.game.turn).forEach(card => db.collection(`games/${gameId}/cards`).add(card))
    })
  }

  render() {
    const { cards, game, setGame } = this.props
    const cardsArr = []
    for(let id in cards){cardsArr.push({id, ...cards[id]})}

    return(
      <div>
        <div className="board">
        {
          cardsArr.length ? cardsArr.map(word => (
            <div key={word.id} id={word.id} onClick={this.clickCard} className={`card ${word.color}`}>
              <h2 id={word.id}>{word.word}</h2>
            </div>
          ))
          :
          <div>
            <div onClick={this.startGame} className="button">{game.status=="pending" ? "Start Game" : "searching for game..."}</div>
          </div>
        }
        </div>
        <Sidebar setGame={setGame} game={game}/>
      </div>
    )
  }
}

const mapState = state => ({
  cards: state.cards,
  game: state.game
})

const mapDispatch = (dispatch, ownProps) => ({
  setGame(game) {dispatch({type:"SET_GAME", game})},
  setCard(id, card) {dispatch({type: "SET_CARD", id, card})},
  changeTurn(e) {dispatch({type:"CHANGE_TURN"})},
  clearCards() {dispatch({type: "CLEAR_CARDS"})}
})

export default connect(mapState, mapDispatch)(withAuth(Board))
