import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'


class Board extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props!==nextProps) this.props=nextProps
  }

  checkGameStatus = status => {
    const cards = this.props.cards
    switch(status){
      case 'pending':
        return (<div className="button" onClick={this.props.startGame}>Start Game!</div>)
      case "in progress":
        return cards.map((word, index) => (
            <Card key={word.word} word={word.word} color={word.color} handleClick={createClicker(index)} />
          ))
      case undefined:
        return (<div className="main-container">waiting for game...</div>)
      default:
        return(<div>I don't know what's happening... {status}</div>)
    }
  }

  render(){
    const { gameStatus, cards, turn, user, createClicker } = this.props
    console.log(this.props)
    return(
      <div>
        <div className="board">
        {this.checkGameStatus(gameStatus)}
        </div>
        <Sidebar user={user} clue={turn.hint} guesses={turn.guesses} turn={turn.color}/>
      </div>
    )
  }
}

const mapState = state => state

const mapDispatch = (dispatch, ownProps) => ({
  createClicker (index) {
    return () => {
      ownProps.gameRef.ref.get()
      .then(res => {
        const firestoreGameData = res.data()
        dispatch(selectCard(index, firestoreGameData.legend[index].color))
      })
    }
  },
  startGame(){
    ownProps.gameRef.ref.get()
    .then(res => {
      const firestoreGameData = res.data()
      dispatch({type:"START_GAME", firstTeam:firestoreGameData.firstTeam})
    })
  }
})


export default connect(mapState, mapDispatch)(Board)
