import {socket} from "../client.js"
// @ts-nocheck

interface props {
  visible: boolean
  margin:any
  pos:any
}

function handleLogout(){
  socket.emit("logout", {})
  setTimeout(function(){ window.location.href = "/"; }, 100); //refresh page
}


const LoginBox : React.FC<props> = function(props) {
  let width = 90
  let padding = 15
  let style = {
    left:`${props.pos.x + (props.pos.width - props.margin)/2 - width/2 - padding }`, //calculate position of the box
    width:width,
    padding:padding
  }
  return (
    <div className = {props.visible ? "visible" : "invisible"} id = "loginBoxDiv" style = {style}>
      <a onClick = {handleLogout} style = {{cursor:'pointer'}}>Logout</a>
      <a href = '/settings'>Settings</a>
    </div>
  )
}

export default LoginBox
