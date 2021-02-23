import socket from "../client.js"
const e = React.createElement;

export default class LoginBox extends React.Component {

  handleLogout(){
    socket.emit("logout", {})
    setTimeout(function(){ window.location.href = "/"; }, 100); //refresh page

  }

  render(){
    let width = 90
    let padding = 15
    let style = {
      left:`${this.props.pos.x + (this.props.pos.width - this.props.margin)/2 - width/2 - padding }`, //calculate position of the box
      width:width,
      padding:padding
    }
    return e("div", {className:(this.props.visible ? "visible" : "invisible"), id:"loginBoxDiv", style:style}, e("a", {onClick:this.handleLogout, style:{cursor:'pointer'}}, "Logout"), e("a", {href:"/settings"}, "Settings"))
  }
}
