import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const google = new firebase.auth.GoogleAuthProvider();
export const email = new firebase.auth.EmailAuthProvider()
export const auth = firebase.auth();

export const db = firebase.firestore()

export const games = db.collection('games')

export const newGame = startingColor =>
  games.add({players: {}, status: "pending", turn: startingColor })

export const newPlayer = (userId, color, role) => {
  games.doc(players).set({[userId]:{color, role}})
}

export const getCards = gameId => {
  games.doc(gameId).collection("cards").get()
  .then(querySnapshot => {
    const cards = []
    if (querySnapshot.empty) cards.push({id:0, word: "No game found... :*("})
    else {
      querySnapshot.forEach(doc => {
        const card=doc.data()
        cards.push(card.flipped ? {id: doc.id, word:card.word, color:card.color} : {id: doc.id, word: card.word})
      })
    }
    console.log(cards)
    return cards
  })
  .catch(err => console.log(err))
}
