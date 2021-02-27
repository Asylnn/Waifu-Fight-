// @ts-nocheck To ignore all "import React Erros"
import Login from "./Login.js"
import CoreInfo from "./CoreInfo.js"

//import User from './classes/user' doesn't work

interface props {
  user:any
}

const Header : React.FC<props> = function(props) { //nothing for now

  return (
    <header>
    {props.user.registred && <CoreInfo user = {props.user}/>}
    <Login login = {props.user}/>
    </header>
  )
}

export default Header
