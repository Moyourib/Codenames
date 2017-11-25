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

  createUser = (e) => {console.log("not doing anything right now")}
  signIn = (e) => auth.signInWithPopup(email)
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
      signInWithGoogle={this.signInWithGoogle}
      signOut={this.signOut}
      />
  }
}