const e = React.createElement;

export default class CoreInfo extends React.Component{

  render(){
    return e("div", null, "XP " + this.props.user.xp)
  }
}
