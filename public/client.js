const socket = io('ws://localhost:3001');
var redirectURL = ""
var user = {}
var app
var loginDetails = {}
var scores = []
import Header from "./reactComponents/Header.js"
import ScoresDisplay from "./reactComponents/ScoresDisplay.js"
export default socket


const e = React.createElement;

class App extends React.Component { //Main React Component
  constructor(props){
    super(props)
    this.state = {loginDetails:loginDetails, redirectURL:redirectURL, user:user, scores:scores}
    this.updateState = this.updateState.bind(this)
    app = this
  }

  updateState(){
    this.setState(prev => {
      console.log({loginDetails:loginDetails, user:user, scores:scores})
      return {loginDetails:loginDetails, user:user, scores:scores}

    });
  }

  render(){
    return (
      e("div", null,
        e(Header, {loginDetails:this.state.loginDetails, user:this.state.user}),
        e(ScoresDisplay, {scores:this.state.scores})
      )
    )
  }
}

ReactDOM.render(e(App), document.getElementById('body'))

socket.on('userInfo', userInfo => { //request user info
  user = userInfo
  loginDetails.registred = user.registred
  loginDetails.imgURL = user.imgURL
  loginDetails.username = user.username
  app.updateState()
})

socket.on('updateScores', data => {
  user = data.user
  scores = scores.concat(data.scores)
  app.updateState()
});



socket.on('info', info => { //request redirectURL
  redirectURL = info.redirectURL
})
