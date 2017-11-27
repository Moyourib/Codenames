import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const google = new firebase.auth.GoogleAuthProvider();
export const email = new firebase.auth.EmailAuthProvider()
export const auth = firebase.auth();

export const db = firebase.firestore()

export const newPlayer = (userId, color, role) => {
  games.doc(players).set({[userId]:{color, role}})
}

export const createEventListener = (gameId, setCard, setGame) =>{
  db.doc(`games/${gameId}`).get()
  .then(gameSnap => {
    if(gameSnap.exists){
      setGame(gameSnap.data())
      db.collection(`games/${gameId}/cards`).onSnapshot(snap => {
        snap.docChanges.forEach(change => {
          const card = change.doc.data()
          const color = card.flipped && card.color
          const id = change.doc.id
          setCard(id, {color, word:card.word})
        })
      })
    }
    else {
      setCard(0, {word:"It looks like this game doesn't exist!"})
    }
  })
}
