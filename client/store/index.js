import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = (state = [], action) => {
  switch(action.type){
    case "SET_CARD":
      return state.map( card =>
        card.id===action.card.id ? action.card : card
      )
    case "SET_CARDS":
      return action.cards
    default:
      return state
  }
}

const players = (state = [], action) => {
  switch(action.type){
    case "SET_PLAYERS":
      return action.players
    default:
      return state
  }
}


const reducer = combineReducers({
  cards,
  players,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
