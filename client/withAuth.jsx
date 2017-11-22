import React from 'react'
import {auth, google, email} from '~/fire'

window.auth = auth

export default Component => class extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  createUser = e => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value)}
  signIn = e => auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
  signInWithGoogle = () => auth.signInWithPopup(google)
  signOut = () => auth.signOut()

  render() {
    // Auth is not ready.
    if (!this.state) return null

    // Get the user off auth.
    const {user} = this.state

    // Render our nested component with the user.
    return <Component {...this.props}
      user={user}
      auth={auth}
      signIn={this.signIn}
      createUser={this.createUser}
      signInWithGoogle={this.signInWithGoogle}
      signOut={this.signOut}
      />
  }
}
