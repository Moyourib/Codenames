import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/* ------------------ INITIAL STATE ----------------- */

const initialState = {
  cards:[],
  turn: {team:''},
  gameStatus: 'pending',
  players: {},
  blueCardsRemaining: 0,
  redCardsRemaining: 0
}

/* ------------------ CARDS REDUCER ----------------- */


const SETUP_CARDS = "SETUP_CARDS"
const SELECT_CARD = "SELECT_CARD"
const REVEAL_CARD = "REVEAL_CARD"

const setUpCards = cards => ({type:SETUP_CARDS, cards})
const selectCard = (cardIndex, cardColor) =>
  ({type:SELECT_CARD, index:cardIndex, color:cardColor})


const cards = (state = initialState.cards, action) => {
  if (action.type === SETUP_CARDS)
      return action.cards

  if (action.type === REVEAL_CARD) {
    const newCards = [...state]
    const {index, color} = action
    const card = state[index]
    newCards[index] = {...card,
      color,
      flipped: 1,
    }
    return newCards
  }

  return state
}


/* ------------------ TURN REDUCER ----------------- */

const START_GAME = "START_GAME"
const END_TURN = "END_TURN"
const SET_HINT = "SET_HINT"
//also selectCard from cards reducers
const endTurn = () => ({type:END_TURN})
const startGame = firstTeam => ({type:START_GAME, firstTeam})

//if it were red's turn, with the clue "country" and 5 guesses
// then turn with look like => {guesses:5, hint:"country", team:"red"}

const turn = (state=initialState.turn, action) => { 
  switch(action.type){
    case START_GAME:
      return {team: action.firstTeam}

    case END_TURN:
      return {team:state.team==="red" ? "blue":"red"}

    case SELECT_CARD:
      if(state.guess-1===0 || action.color!==state.team) {
        return {team: state.team==="red" ? "blue":"red"}
      }
      return {guesses: state.guesses--, hint:state.hint, team:state.team}

    case SET_HINT:
      return {guesses:action.guesses, hint:action.hint, team:state.team}

    default:
      return state
  }
}

/* ------------------ ACTIVE TEAM REDUCER ----------------- */

//is going to be using start_game and select_card

const redCardsRemaining = (state = initialState.redCardsRemaining, action) => {
  switch(action.type){
    case START_GAME:
      return action.firstTeam==="red" ? 9 : 8
    case REVEAL_CARD:
      if(action.color==="red") return state-1
      if(action.color==="black") return -1
    default:
      return state
  }
}

const blueCardsRemaining = (state = initialState.blueCardsRemaining, action) => {
  switch(action.type){
    case START_GAME:
      return action.firstTeam==="blue" ? 9 : 8
    case REVEAL_CARD:
      if(action.color==="blue") return state-1
      if(action.color==="black") return -1
    default:
      return state
  }
}
// const activeTeam = (state='', action) => {
//   switch(action.type){
//     case "END_TURN":
//       return state==="red" ? "blue":"red"
//     case "SELECT_CARD":
//       return
//     default:
//       return state
//   }
// }


/* ------------------ GAME STATUS REDUCER ----------------- */

const END_GAME = "END_GAME"
const SET_STATUS = "SET_STATUS"
//also START_GAME from turn reducer

const endGame = () => ({type:END_GAME})

const gameStatus = (state=initialState.gameStatus, action) => {
  switch(action.type){
    case SET_STATUS:
      return action.status

    case START_GAME:
      return "in progress"

    case END_GAME:
      return "ended"

    default:
      return state
  }
}

/* ------------------ PLAYERS REDUCER ----------------- */

const LEAVE_GAME = "LEAVE_GAME"
const SET_PLAYER = "SET_PLAYER"

const setPlayer = (id, player) => ({type: SET_PLAYER, id, player})
// player is an object with name, role and team
//    example -> {name: "Joyce", role: "spymaster", team: "red"}

const leaveGame = userId => ({type: LEAVE_GAME, id: userId})

const players = (state=initialState.players, action) => {
  const newPlayers = {...state}
  switch(action.type){

    case START_GAME:
      return action.players

    case SET_PLAYER:
      newPlayers[action.id]= action.player
      return newPlayers

    case "UPDATE_ROLE":
      const playerRole = state[action.id]
      playerRole.role = action.role
      newPlayers[action.id] = playerRole
      return newPlayers

    case "UPDATE_TEAM":
      const playerTeam = state[action.id]
      playerTeam.team = action.team
      newPlayers[action.id] = playerTeam
      return newPlayers

    case LEAVE_GAME:
      delete newPlayers[action.id]
      return newPlayers

    default:
      return state
  }
}


const reducer = combineReducers({
  cards,
  turn,
  gameStatus,
  players,
  redCardsRemaining,
  blueCardsRemaining
})

export default reducer

export { setUpCards, selectCard, startGame, setPlayer, leaveGame }
