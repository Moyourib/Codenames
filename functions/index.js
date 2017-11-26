const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   console.log(request)
//   response.send("Hello from Firebase!");
// });

// function that writes over cards when flipped

// exports.dealCards = functions.firestore.document('games/{gameId}')
//   .onCreate(event => {
//     const createCard = (array, color) => {
//       let word = randomWord()
//       if(array.find(e => e.word===word)) word = randomWord()
//       return {word, color, flipped: false}
//     }
//
//     const randomWord = () => wordlist[Math.floor(Math.random()*400)]
//
//     const newGame = event.data.data()
//     const startingColor = Math.round(Math.random()) ? "red" : "blue"
//     const cards = []
//       cards.push(createCard(cards, "black"))
//       cards.push(createCard(cards, startingColor))
//     while(cards.length<18) {
//       cards.push(createCard(cards, "red"))
//       cards.push(createCard(cards, "blue"))
//     }
//     while(cards.length<25) cards.push(createCard(cards, "white"))
//     cards.forEach(card => {
//       event.data.collection(cards).add(card)
//     })
//   })
