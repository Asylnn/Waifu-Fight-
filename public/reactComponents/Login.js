const e = React.createElement;
import getStyleProperty from "../modules/functions.js"
import LoginBox from "./LoginBox.js"




export default class Login extends React.Component {
  constructor(){
    super()
    this.state = {loginBoxOpenned:false, pos:{}, margin:{}}
    this.handleClick = this.handleClick.bind(this)
    this.ref = React.createRef();
  }

  handleClick(){
    if(this.props.login.registred){
      this.setState(prev => {
        return {loginBoxOpenned:!prev.loginBoxOpenned, pos:ReactDOM.findDOMNode(this).getBoundingClientRect(), margin:parseInt(getStyleProperty(this.ref.current, "margin-right"))}
      });
    }
    else{
      window.location.href = "/login" //this redirect to oauth2 grant access page 
    }
  }

  render(){
    return (
      e("div", null, /*This is the outer box of Login*/
        e("div", {id:"loginDiv", onClick:this.handleClick, ref:this.ref},
          e("img", {src:this.props.login.imgURL, width:"50", height:"50", style:{marginRight:"10"}}),
          e("span", null, this.props.login.username)
        ),
        e(LoginBox, {pos:this.state.pos, margin:this.state.margin, visible:this.state.loginBoxOpenned})
      )
    )
  }
}
