import getStyleProperty from "../modules/functions.js"
import LoginBox from "./LoginBox.js"
//import User from '../classes/user'

interface props{
  login: any
}

interface state{
  loginBoxOpenned:boolean
  pos:any
  margin:any
}


export default class Login extends React.Component<props, state> {
  // @ts-ignore
  private ref = React.createRef<HTMLDivElement>()
  constructor(props: any){
    super(props)
    this.state
    this.state = {loginBoxOpenned:false, pos:{}, margin:{}}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    if(this.props.login.registred){
      this.setState(prev => {
        return {
          loginBoxOpenned:!prev.loginBoxOpenned,
          pos:(ReactDOM as any).findDOMNode(this).getBoundingClientRect(), //Error: ReactDOM is possibly null
          margin:parseInt(getStyleProperty(this.ref.current, "margin-right"))
        }
      });
    }
    else{
      window.location.href = "/login" //this redirect to oauth2 grant access page
    }
  }

  render(){
    return (
      <div>
        <div id = "loginDiv" onClick={this.handleClick} ref = {this.ref}>
          <img src = {this.props.login.imgURL} width='50' height='50' style = {{marginRight:"10"}}/>
          <span>{this.props.login.username}</span>
          <LoginBox pos = {this.state.pos} margin = {this.state.margin} visible = {this.state.loginBoxOpenned}/>
        </div>
      </div>
    )
  }
}
