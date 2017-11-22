import wordlist from '../wordlist'
import { db } from '../fire'

export const createCard = (array, color) => {
  let word = randomWord()
  if(array.includes(word)) word = randomWord()
  return {word, color, flipped: false}
}

export const randomWord = () => wordlist[Math.floor(Math.random()*400)]

export const makeGame = () => {
  const startingColor = Math.round(Math.random()) ? "red" : "blue"
  const cards = []
  cards.push(createCard(cards, "black"))
  cards.push(createCard(cards, startingColor))
  for(let i=0; i<8; i++){
    cards.push(createCard(cards, "red"))
    cards.push(createCard(cards, "blue"))
  }
  while(cards.length<25){
    cards.push(createCard(cards, "white"))
  }

  db.collection('/games').add({players: {}, status: "pending", turn: startingColor })
  .then(res => {
    cards.forEach(word => db.doc(res.path).collection("cards").add(word))
    return res.id
  })
  .then(id => {
    ownProps.history.push("/"+id)
  })
}
