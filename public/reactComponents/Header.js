const e = React.createElement;
import Login from "./Login.js"
import CoreInfo from "./CoreInfo.js"

class Header extends React.Component { //nothing for now
  constructor(){
    super()
  }

  render(){
    console.log("rendering header")
    return (
      e('header', null,
        this.props.user.registred && e(CoreInfo, {user:this.props.user}),
        e(Login, {login:this.props.loginDetails})
      )
    )
  }
}

export default Header
