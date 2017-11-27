import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = (state = {}, action) => {
  switch(action.type){
    case "SET_CARD":
      return Object.assign({}, state, {[action.id]:action.card})
    case "CLEAR_CARDS":
      return {}
    default:
      return state
  }
}

const game = (state = {}, action) => {
  switch(action.type){
    case "SET_GAME":
      return action.game
    default:
      return state
  }
}


const reducer = combineReducers({
  cards,
  game,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
