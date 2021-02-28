

interface props {
  gamemode:string
  handleChange:any
  checked:boolean
}

const CheckboxGamemode : React.FC<props> = function(props){
  return (
    <div style = {{"margin":"10"}}>
      <input type = "checkbox" name = {props.gamemode} checked = {props.checked} onChange = {props.handleChange}/>
      <span>{props.gamemode}</span>
    </div>
  )
}


export default CheckboxGamemode
