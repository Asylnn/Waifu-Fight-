
//import User from '../classes/user'

interface props {
  user:any
}

const CoreInfo : React.FC<props> = function(props){

  return <div>{"XP " + props.user.xp}</div>

}

export default CoreInfo
