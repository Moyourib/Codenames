import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = function (state = {}, action) {
  switch(action.type){
    case "FLIP_CARD":
      return state.map( word =>
        word.id===action.wordId ? {id:word.id, word:word.word, color:word.color, flipped: true} : word
      )
    case "SET_CARDS":
      return action.cards
    default:
      return state
  }
}

const reducer = combineReducers({
  cards,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
