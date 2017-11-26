import wordlist from '../wordlist'
import { db, newGame } from '../fire'

export const createCard = (array, color) => {
  let word = randomWord()
  if(array.find(e => e.word===word)) word = randomWord()
  return {word, color, flipped: false}
}

export const randomWord = () => wordlist[Math.floor(Math.random()*400)]


//onCreate cloud function ...
export const dealCards = startingColor => {
  const cards = []
    cards.push(createCard(cards, "black"))
    cards.push(createCard(cards, startingColor))
  while(cards.length<18) {
    cards.push(createCard(cards, "red"))
    cards.push(createCard(cards, "blue"))
  }
  while(cards.length<25) {
    cards.push(createCard(cards, "white"))
  }
  return cards
}

export const makeGame = history => {
  const startingColor = Math.round(Math.random()) ? "red" : "blue"
  newGame(startingColor)
  .then(game => {
    dealCards(startingColor).forEach(card => game.collection("cards").add(card))
    return game.id
  })
  .then(id => {
    history.push("/"+id)
  })
}
