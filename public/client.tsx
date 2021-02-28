// @ts-nocheck To ignore all "import React Erros"

export const socket = io('ws://localhost:3001');

var redirectURL = ""
var user:any = {registred:false}
var app:App
var scores: any[] = []

import Header from "./reactComponents/Header.js"
import ScoresDisplay from "./reactComponents/ScoresDisplay.js"

interface props {

}

interface state {
  redirectURL:string
  user:any
  scores:any[]
}

class App extends React.Component<props, state> { //Main React Component
  constructor(){
    super()
    this.state = {redirectURL:redirectURL, user:user, scores:scores}
    this.updateState = this.updateState.bind(this)
    app = this
  }

  updateState(){
    this.setState(() => {
      return {user:user, scores:scores}

    });
  }

  render(){
      return <div>
      <Header user = {this.state.user}/>
      <ScoresDisplay scores = {this.state.scores} />
      </div>



  }
}

ReactDOM.render(<App></App>, document.getElementById('body'))

socket.on('userInfo', (userInfo:any) => { //request user info
  user = userInfo
  app.updateState()
})

socket.on('updateScores', (data:{scores:any[], user:any}) => {
  user = data.user

  scores = scores.concat(data.scores)
  app.updateState()
});



socket.on('info', (info: any) => { //request redirectURL
  redirectURL = info.redirectURL
})
